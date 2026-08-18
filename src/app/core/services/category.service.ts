import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SEED_CATEGORIES } from '../data/bank.seed';
import { Category } from '../models/bank.model';

const KEY = 'hope_categories';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly items$ = new BehaviorSubject<Category[]>(this.load());
  readonly changes$ = this.items$.asObservable();

  list(): Category[] {
    return [...this.items$.value].sort((a, b) => a.sort - b.sort || a.name.localeCompare(b.name, 'zh-CN'));
  }

  get(id: string): Category | undefined {
    return this.items$.value.find((item) => item.id === id);
  }

  nameOf(id: string): string {
    return this.get(id)?.name ?? '未分类';
  }

  create(payload: Pick<Category, 'name' | 'sort' | 'description'>): { ok: boolean; message: string } {
    const name = payload.name.trim();
    if (!name) {
      return { ok: false, message: '请填写分类名称' };
    }
    if (this.items$.value.some((item) => item.name === name)) {
      return { ok: false, message: '分类名称已存在' };
    }
    const next: Category = {
      id: `cat-${Date.now()}`,
      name,
      sort: Number(payload.sort) || 0,
      description: payload.description.trim(),
      createdAt: Date.now()
    };
    this.commit([...this.items$.value, next]);
    return { ok: true, message: '' };
  }

  update(id: string, payload: Pick<Category, 'name' | 'sort' | 'description'>): { ok: boolean; message: string } {
    const name = payload.name.trim();
    if (!name) {
      return { ok: false, message: '请填写分类名称' };
    }
    if (this.items$.value.some((item) => item.name === name && item.id !== id)) {
      return { ok: false, message: '分类名称已存在' };
    }
    const items = this.items$.value.map((item) =>
      item.id === id
        ? { ...item, name, sort: Number(payload.sort) || 0, description: payload.description.trim() }
        : item
    );
    this.commit(items);
    return { ok: true, message: '' };
  }

  delete(id: string): void {
    this.commit(this.items$.value.filter((item) => item.id !== id));
  }

  count(): number {
    return this.items$.value.length;
  }

  snapshot(): Category[] {
    return [...this.items$.value];
  }

  replaceAll(items: Category[]): void {
    this.commit(items);
  }

  upsertMany(items: Category[]): { added: number; updated: number } {
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

  private load(): Category[] {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try {
        return JSON.parse(raw) as Category[];
      } catch {
        return [...SEED_CATEGORIES];
      }
    }
    localStorage.setItem(KEY, JSON.stringify(SEED_CATEGORIES));
    return [...SEED_CATEGORIES];
  }

  private commit(items: Category[]): void {
    localStorage.setItem(KEY, JSON.stringify(items));
    this.items$.next(items);
  }
}
