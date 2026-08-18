import { Component } from '@angular/core';
import { DIFF_LABELS, TYPE_LABELS } from '../../../core/models/bank.model';
import { CategoryService } from '../../../core/services/category.service';
import { QuestionService } from '../../../core/services/question.service';
import { StudyService } from '../../../core/services/study.service';

@Component({
  selector: 'app-question-browse',
  templateUrl: './question-browse.component.html',
  styleUrls: ['./question-browse.component.scss']
})
export class QuestionBrowseComponent {
  readonly typeLabels = TYPE_LABELS;
  readonly diffLabels = DIFF_LABELS;
  categoryId = '';
  keyword = '';

  constructor(
    private readonly categories: CategoryService,
    private readonly questions: QuestionService,
    private readonly study: StudyService
  ) {}

  get categoryList() {
    return this.categories.list();
  }

  get rows() {
    return this.questions.list({
      keyword: this.keyword,
      categoryId: this.categoryId || undefined,
      enabledOnly: true
    });
  }

  categoryName(id: string): string {
    return this.categories.nameOf(id);
  }

  fav(id: string): boolean {
    return this.study.isFavorite(id);
  }
}
