import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DIFF_LABELS, PaperConfig } from '../../../core/models/bank.model';
import { CategoryService } from '../../../core/services/category.service';
import { ExamService } from '../../../core/services/exam.service';

@Component({
  selector: 'app-exam-home',
  templateUrl: './exam-home.component.html',
  styleUrls: ['./exam-home.component.scss']
})
export class ExamHomeComponent {
  readonly diffLabels = DIFF_LABELS;
  categoryId = '';
  difficulty: PaperConfig['difficulty'] = '';
  count = 10;
  timeLimitMin = 15;
  error = '';

  constructor(
    private readonly categories: CategoryService,
    readonly exam: ExamService,
    private readonly router: Router
  ) {}

  get categoryList() {
    return this.categories.list();
  }

  get pool(): number {
    return this.exam.poolSize({ categoryId: this.categoryId, difficulty: this.difficulty });
  }

  get pending() {
    return this.exam.currentSession();
  }

  get history() {
    return this.exam.records().slice(0, 8);
  }

  start(resume = false): void {
    this.error = '';
    if (resume && this.pending) {
      void this.router.navigateByUrl('/user/exam/take');
      return;
    }
    if (this.pending) {
      this.exam.clearSession();
    }
    const result = this.exam.start({
      categoryId: this.categoryId,
      difficulty: this.difficulty,
      count: Number(this.count) || 10,
      timeLimitMin: Number(this.timeLimitMin) || 0,
      source: 'compose'
    });
    if (!result.ok) {
      this.error = result.message;
      return;
    }
    void this.router.navigateByUrl('/user/exam/take');
  }

  categoryName(id: string): string {
    return id ? this.categories.nameOf(id) : '全部分类';
  }
}
