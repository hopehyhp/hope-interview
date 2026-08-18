import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DIFF_LABELS, TYPE_LABELS } from '../../../core/models/bank.model';
import { CategoryService } from '../../../core/services/category.service';
import { ExamService } from '../../../core/services/exam.service';
import { QuestionService } from '../../../core/services/question.service';

@Component({
  selector: 'app-wrong-book',
  templateUrl: './wrong-book.component.html',
  styleUrls: ['./wrong-book.component.scss']
})
export class WrongBookComponent {
  readonly typeLabels = TYPE_LABELS;
  readonly diffLabels = DIFF_LABELS;
  error = '';

  constructor(
    private readonly exam: ExamService,
    private readonly questions: QuestionService,
    private readonly categories: CategoryService,
    private readonly router: Router
  ) {}

  get rows() {
    return this.exam.wrongItems()
      .map((item) => ({ ...item, question: this.questions.get(item.questionId) }))
      .filter((item) => item.question?.enabled);
  }

  categoryName(id: string): string {
    return this.categories.nameOf(id);
  }

  retryAll(): void {
    this.error = '';
    const ids = this.rows.map((item) => item.questionId);
    const result = this.exam.start(
      { categoryId: '', difficulty: '', count: ids.length, timeLimitMin: 0, source: 'wrong' },
      ids
    );
    if (!result.ok) {
      this.error = result.message;
      return;
    }
    void this.router.navigateByUrl('/user/exam/take');
  }

  retryOne(id: string): void {
    const result = this.exam.start(
      { categoryId: '', difficulty: '', count: 1, timeLimitMin: 0, source: 'wrong' },
      [id]
    );
    if (!result.ok) {
      this.error = result.message;
      return;
    }
    void this.router.navigateByUrl('/user/exam/take');
  }

  remove(id: string): void {
    this.exam.removeWrong(id);
  }
}
