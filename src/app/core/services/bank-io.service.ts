import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CategoryService } from './category.service';
import { QuestionService } from './question.service';
import { BankBundle } from '../models/bank.model';

@Injectable({ providedIn: 'root' })
export class BankIoService {
  constructor(
    private readonly questions: QuestionService,
    private readonly categories: CategoryService
  ) {}

  export(): BankBundle {
    return {
      version: 1,
      exportedAt: Date.now(),
      categories: this.categories.snapshot(),
      questions: this.questions.snapshot()
    };
  }

  importJson(raw: string, mode: 'merge' | 'replace'): { ok: boolean; message: string } {
    let bundle: BankBundle;
    try {
      bundle = JSON.parse(raw) as BankBundle;
    } catch {
      return { ok: false, message: 'JSON 格式无效' };
    }
    const categories = Array.isArray(bundle?.categories) ? bundle.categories : [];
    const questions = Array.isArray(bundle?.questions) ? bundle.questions : [];
    if (!categories.length && !questions.length) {
      return { ok: false, message: '文件中没有分类或题目' };
    }
    if (mode === 'replace') {
      this.categories.replaceAll(categories);
      this.questions.replaceAll(questions);
      return { ok: true, message: `已覆盖导入：分类 ${categories.length}，题目 ${questions.length}` };
    }
    const cat = this.categories.upsertMany(categories);
    const q = this.questions.upsertMany(questions);
    return {
      ok: true,
      message: `已合并：分类 +${cat.added}/${cat.updated}，题目 +${q.added}/${q.updated}`
    };
  }
}
