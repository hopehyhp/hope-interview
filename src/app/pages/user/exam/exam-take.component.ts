import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  DIFF_LABELS,
  ExamAnswer,
  ExamQuestionSnap,
  ExamSession,
  QuestionType,
  TYPE_LABELS,
  TYPE_ORDER
} from '../../../core/models/bank.model';
import { CategoryService } from '../../../core/services/category.service';
import { ExamService } from '../../../core/services/exam.service';

interface SheetGroup {
  type: QuestionType;
  label: string;
  items: { index: number; id: string }[];
}

@Component({
  selector: 'app-exam-take',
  templateUrl: './exam-take.component.html',
  styleUrls: ['./exam-take.component.scss']
})
export class ExamTakeComponent implements OnInit, OnDestroy {
  readonly typeLabels = TYPE_LABELS;
  readonly diffLabels = DIFF_LABELS;
  session: ExamSession | null = null;
  remainSec = -1;
  submitting = false;
  private timer = 0;

  constructor(
    private readonly exam: ExamService,
    private readonly categories: CategoryService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.session = this.exam.ensureTypeOrder();
    if (!this.session) {
      void this.router.navigateByUrl('/user/exam');
      return;
    }
    this.tick();
    this.timer = window.setInterval(() => this.tick(), 1000);
  }

  ngOnDestroy(): void {
    window.clearInterval(this.timer);
  }

  get question(): ExamQuestionSnap | undefined {
    return this.session?.questions[this.session.index];
  }

  get answer(): ExamAnswer {
    const id = this.question?.id ?? '';
    return this.session?.answers[id] ?? { questionId: id, keys: [], text: '' };
  }

  get clock(): string {
    if (this.remainSec < 0) {
      return '不限时';
    }
    const m = Math.floor(this.remainSec / 60);
    const s = this.remainSec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  get groupNo(): number {
    if (!this.session || !this.question) {
      return 1;
    }
    return this.session.questions.filter((item) => item.type === this.question?.type).findIndex((item) => item.id === this.question?.id) + 1;
  }

  get groupSize(): number {
    return this.session?.questions.filter((item) => item.type === this.question?.type).length ?? 0;
  }

  get judgeOpts() {
    const opts = this.question?.options ?? [];
    return opts.length ? opts : [{ key: 'T', text: '正确' }, { key: 'F', text: '错误' }];
  }

  get answeredCount(): number {
    return this.session?.questions.filter((item) => this.answered(item.id)).length ?? 0;
  }

  get sheetGroups(): SheetGroup[] {
    if (!this.session) {
      return [];
    }
    return TYPE_ORDER.map((type) => ({
      type,
      label: TYPE_LABELS[type],
      items: this.session!.questions
        .map((item, index) => ({ index, id: item.id, type: item.type }))
        .filter((item) => item.type === type)
        .map(({ index, id }) => ({ index, id }))
    })).filter((group) => group.items.length);
  }

  categoryName(id: string): string {
    return this.categories.nameOf(id);
  }

  isOn(key: string): boolean {
    return this.answer.keys.includes(key);
  }

  pick(key: string): void {
    if (!this.question || !this.session) {
      return;
    }
    const single = this.question.type === 'single' || this.question.type === 'judge';
    const keys = single
      ? [key]
      : this.isOn(key)
        ? this.answer.keys.filter((item) => item !== key)
        : [...this.answer.keys, key].sort();
    this.patch({ questionId: this.question.id, keys, text: this.answer.text });
  }

  writeEssay(text: string): void {
    if (!this.question) {
      return;
    }
    this.patch({ questionId: this.question.id, keys: [], text });
  }

  go(delta: number): void {
    if (!this.session) {
      return;
    }
    this.exam.setIndex(this.session.index + delta);
    this.session = this.exam.currentSession();
  }

  jump(index: number): void {
    this.exam.setIndex(index);
    this.session = this.exam.currentSession();
  }

  answered(id: string): boolean {
    const item = this.session?.answers[id];
    if (!item) {
      return false;
    }
    return item.keys.length > 0 || !!item.text.trim();
  }

  groupDone(group: SheetGroup): number {
    return group.items.filter((item) => this.answered(item.id)).length;
  }

  submit(): void {
    if (this.submitting) {
      return;
    }
    this.submitting = true;
    const record = this.exam.submit();
    if (!record) {
      this.submitting = false;
      return;
    }
    void this.router.navigate(['/user/exam/result', record.id]);
  }

  private patch(answer: ExamAnswer): void {
    this.exam.saveAnswer(answer);
    this.session = this.exam.currentSession();
  }

  private tick(): void {
    const session = this.exam.currentSession();
    if (!session) {
      return;
    }
    if (!session.deadlineAt) {
      this.remainSec = -1;
      return;
    }
    this.remainSec = Math.max(0, Math.floor((session.deadlineAt - Date.now()) / 1000));
    if (this.remainSec === 0) {
      this.submit();
    }
  }
}
