import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SEED_QUESTIONS } from '../data/bank.seed';
import { Question, QuestionType } from '../models/bank.model';

const KEY = 'hope_questions';

export interface QuestionFilter {
  keyword?: string;
  categoryId?: string;
  type?: QuestionType | '';
  difficulty?: string;
  enabledOnly?: boolean;
}

export type QuestionPayload = Omit<Question, 'id' | 'createdAt' | 'updatedAt'>;

@Injectable({ providedIn: 'root' })
export class QuestionService {
  private readonly items$ = new BehaviorSubject<Question[]>(this.load());
  readonly changes$ = this.items$.asObservable();

  list(filter: QuestionFilter = {}): Question[] {
    const keyword = (filter.keyword || '').trim().toLowerCase();
    return this.items$.value
      .filter((item) => {
        if (filter.enabledOnly && !item.enabled) {
          return false;
        }
        if (filter.categoryId && item.categoryId !== filter.categoryId) {
          return false;
        }
        if (filter.type && item.type !== filter.type) {
          return false;
        }
        if (filter.difficulty && item.difficulty !== filter.difficulty) {
          return false;
        }
        if (keyword && !item.title.toLowerCase().includes(keyword)) {
          return false;
        }
        return true;
      })
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }

  get(id: string): Question | undefined {
    return this.items$.value.find((item) => item.id === id);
  }

  create(payload: QuestionPayload): { ok: boolean; message: string } {
    const checked = this.validate(payload);
    if (!checked.ok) {
      return checked;
    }
    const now = Date.now();
    const next: Question = { ...payload, id: `q-${now}`, createdAt: now, updatedAt: now };
    this.commit([next, ...this.items$.value]);
    return { ok: true, message: '' };
  }

  update(id: string, payload: QuestionPayload): { ok: boolean; message: string } {
    const checked = this.validate(payload);
    if (!checked.ok) {
      return checked;
    }
    if (!this.get(id)) {
      return { ok: false, message: '题目不存在' };
    }
    const items = this.items$.value.map((item) =>
      item.id === id ? { ...item, ...payload, updatedAt: Date.now() } : item
    );
    this.commit(items);
    return { ok: true, message: '' };
  }

  delete(id: string): void {
    this.commit(this.items$.value.filter((item) => item.id !== id));
  }

  count(categoryId?: string): number {
    return this.items$.value.filter((item) => !categoryId || item.categoryId === categoryId).length;
  }

  snapshot(): Question[] {
    return [...this.items$.value];
  }

  replaceAll(items: Question[]): void {
    this.commit(items);
  }

  upsertMany(items: Question[]): { added: number; updated: number } {
    const map = new Map(this.items$.value.map((item) => [item.id, item]));
    let added = 0;
    let updated = 0;
    items.forEach((item) => {
      if (map.has(item.id)) {
        updated += 1;
      } else {
        added += 1;
      }
      map.set(item.id, item);
    });
    this.commit([...map.values()]);
    return { added, updated };
  }

  private validate(payload: QuestionPayload): { ok: boolean; message: string } {
    if (!payload.title.trim()) {
      return { ok: false, message: '请填写题干' };
    }
    if (!payload.categoryId) {
      return { ok: false, message: '请选择分类' };
    }
    if (!payload.analysis.trim()) {
      return { ok: false, message: '请填写参考解答' };
    }
    if (payload.type !== 'essay') {
      const options = payload.options.filter((item) => item.text.trim());
      if (options.length < 2) {
        return { ok: false, message: '选择题至少需要两个选项' };
      }
      const keys = payload.answer.split(',').filter(Boolean);
      if (!keys.length) {
        return { ok: false, message: '请设置正确答案' };
      }
    }
    return { ok: true, message: '' };
  }

  private load(): Question[] {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try {
        return this.withMissingSeeds(JSON.parse(raw) as Question[]);
      } catch {
        return [...SEED_QUESTIONS];
      }
    }
    localStorage.setItem(KEY, JSON.stringify(SEED_QUESTIONS));
    return [...SEED_QUESTIONS];
  }

  private withMissingSeeds(items: Question[]): Question[] {
    const map = new Map(items.map((item) => [item.id, item]));
    let changed = false;
    SEED_QUESTIONS.forEach((item) => {
      if (!map.has(item.id)) {
        map.set(item.id, item);
        changed = true;
      }
    });
    const next = [...map.values()];
    if (changed) {
      localStorage.setItem(KEY, JSON.stringify(next));
    }
    return next;
  }

  private commit(items: Question[]): void {
    localStorage.setItem(KEY, JSON.stringify(items));
    this.items$.next(items);
  }
}
