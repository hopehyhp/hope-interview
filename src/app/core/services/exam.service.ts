import { Injectable } from '@angular/core';
import {
  DIFF_LABELS,
  ExamAnswer,
  ExamItemResult,
  ExamQuestionSnap,
  ExamRecord,
  ExamSession,
  PaperConfig,
  Question,
  TYPE_ORDER,
  WrongItem
} from '../models/bank.model';
import { AuthService } from './auth.service';
import { QuestionService } from './question.service';

@Injectable({ providedIn: 'root' })
export class ExamService {
  constructor(
    private readonly auth: AuthService,
    private readonly questions: QuestionService
  ) {}

  currentSession(): ExamSession | null {
    return this.readJson<ExamSession>(this.sessionKey());
  }

  records(): ExamRecord[] {
    return this.readList<ExamRecord>(this.recordKey()).sort((a, b) => b.finishedAt - a.finishedAt);
  }

  recordOf(id: string): ExamRecord | undefined {
    return this.records().find((item) => item.id === id);
  }

  wrongItems(): WrongItem[] {
    return this.readList<WrongItem>(this.wrongKey()).sort((a, b) => b.lastWrongAt - a.lastWrongAt);
  }

  poolSize(config: Pick<PaperConfig, 'categoryId' | 'difficulty'>): number {
    return this.pool(config).length;
  }

  start(config: PaperConfig, questionIds?: string[]): { ok: boolean; message: string } {
    const userId = this.auth.currentUser()?.id;
    if (!userId) {
      return { ok: false, message: '请先登录' };
    }
    const source = questionIds?.length
      ? this.questions
          .list({ enabledOnly: true })
          .filter((item) => questionIds.includes(item.id))
      : this.shuffle(this.pool(config)).slice(0, Math.max(1, config.count));
    if (!source.length) {
      return { ok: false, message: config.source === 'wrong' ? '错题本为空' : '没有符合条件的公开题目' };
    }
    const now = Date.now();
    const session: ExamSession = {
      id: `exam-${now}`,
      userId,
      config: { ...config, count: source.length },
      questions: this.orderByType(source.map((item) => this.snap(item))),
      answers: {},
      startedAt: now,
      deadlineAt: config.timeLimitMin > 0 ? now + config.timeLimitMin * 60 * 1000 : null,
      index: 0
    };
    this.writeJson(this.sessionKey(), session);
    return { ok: true, message: '' };
  }

  saveAnswer(answer: ExamAnswer): void {
    const session = this.currentSession();
    if (!session) {
      return;
    }
    session.answers[answer.questionId] = answer;
    this.writeJson(this.sessionKey(), session);
  }

  ensureTypeOrder(): ExamSession | null {
    const session = this.currentSession();
    if (!session) {
      return null;
    }
    const currentId = session.questions[session.index]?.id;
    const ordered = this.orderByType(session.questions);
    const same = ordered.every((item, i) => item.id === session.questions[i]?.id);
    if (same) {
      return session;
    }
    session.questions = ordered;
    session.index = Math.max(0, ordered.findIndex((item) => item.id === currentId));
    this.writeJson(this.sessionKey(), session);
    return session;
  }

  orderByType<T extends { type: Question['type'] }>(list: T[]): T[] {
    const known = TYPE_ORDER.flatMap((type) => list.filter((item) => item.type === type));
    const rest = list.filter((item) => !TYPE_ORDER.includes(item.type));
    return [...known, ...rest];
  }

  setIndex(index: number): void {
    const session = this.currentSession();
    if (!session) {
      return;
    }
    session.index = Math.min(Math.max(0, index), session.questions.length - 1);
    this.writeJson(this.sessionKey(), session);
  }

  clearSession(): void {
    localStorage.removeItem(this.sessionKey());
  }

  submit(): ExamRecord | null {
    const session = this.currentSession();
    if (!session) {
      return null;
    }
    const items = session.questions.map((q) => this.grade(q, session.answers[q.id]));
    const scored = items.filter((item) => item.scored);
    const correctCount = scored.filter((item) => item.correct).length;
    const scoredCount = scored.length;
    const record: ExamRecord = {
      id: session.id,
      userId: session.userId,
      config: session.config,
      startedAt: session.startedAt,
      finishedAt: Date.now(),
      items,
      correctCount,
      scoredCount,
      score: scoredCount ? Math.round((correctCount / scoredCount) * 100) : 0
    };
    this.writeJson(this.recordKey(), [record, ...this.records()]);
    this.syncWrongBook(items);
    this.clearSession();
    return record;
  }

  removeWrong(questionId: string): void {
    this.writeJson(
      this.wrongKey(),
      this.wrongItems().filter((item) => item.questionId !== questionId)
    );
  }

  attemptCount(): number {
    return this.records().length;
  }

  diffLabel(value: PaperConfig['difficulty']): string {
    return value ? DIFF_LABELS[value] : '不限';
  }

  private pool(config: Pick<PaperConfig, 'categoryId' | 'difficulty'>): Question[] {
    return this.questions.list({
      enabledOnly: true,
      categoryId: config.categoryId || undefined,
      difficulty: config.difficulty || undefined
    });
  }

  private snap(item: Question): ExamQuestionSnap {
    return {
      id: item.id,
      title: item.title,
      categoryId: item.categoryId,
      type: item.type,
      difficulty: item.difficulty,
      options: item.options,
      answer: item.answer,
      analysis: item.analysis
    };
  }

  private grade(q: ExamQuestionSnap, answer?: ExamAnswer): ExamItemResult {
    const userAnswer =
      q.type === 'essay' ? (answer?.text || '').trim() : this.norm((answer?.keys || []).join(','));
    const correctAnswer = q.type === 'essay' ? '' : this.norm(q.answer);
    const scored = q.type !== 'essay';
    const correct = scored ? userAnswer === correctAnswer : !!userAnswer;
    return {
      questionId: q.id,
      title: q.title,
      type: q.type,
      userAnswer,
      correctAnswer,
      analysis: q.analysis,
      correct,
      scored
    };
  }

  private syncWrongBook(items: ExamItemResult[]): void {
    const map = new Map(this.wrongItems().map((item) => [item.questionId, item]));
    items.forEach((item) => {
      if (!item.scored) {
        return;
      }
      if (item.correct) {
        map.delete(item.questionId);
        return;
      }
      const prev = map.get(item.questionId);
      map.set(item.questionId, {
        questionId: item.questionId,
        wrongCount: (prev?.wrongCount ?? 0) + 1,
        lastWrongAt: Date.now(),
        lastAnswer: item.userAnswer
      });
    });
    this.writeJson(this.wrongKey(), [...map.values()]);
  }

  private norm(value: string): string {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .sort()
      .join(',');
  }

  private shuffle<T>(list: T[]): T[] {
    const next = [...list];
    for (let i = next.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [next[i], next[j]] = [next[j], next[i]];
    }
    return next;
  }

  private sessionKey(): string {
    return `hope_exam_session_${this.auth.currentUser()?.id ?? 'guest'}`;
  }

  private recordKey(): string {
    return `hope_exam_records_${this.auth.currentUser()?.id ?? 'guest'}`;
  }

  private wrongKey(): string {
    return `hope_wrong_${this.auth.currentUser()?.id ?? 'guest'}`;
  }

  private readList<T>(key: string): T[] {
    return this.readJson<T[]>(key) ?? [];
  }

  private readJson<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  }

  private writeJson(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
