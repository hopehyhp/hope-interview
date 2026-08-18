import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DIFF_LABELS, Question, TYPE_LABELS } from '../../../core/models/bank.model';
import { CategoryService } from '../../../core/services/category.service';
import { QuestionService } from '../../../core/services/question.service';
import { StudyService } from '../../../core/services/study.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent implements OnInit {
  readonly typeLabels = TYPE_LABELS;
  readonly diffLabels = DIFF_LABELS;
  question?: Question;
  favorited = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly questions: QuestionService,
    private readonly categories: CategoryService,
    private readonly study: StudyService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    const found = this.questions.get(id);
    if (!found || !found.enabled) {
      void this.router.navigateByUrl('/user/questions');
      return;
    }
    this.question = found;
    this.study.markViewed(found.id);
    this.favorited = this.study.isFavorite(found.id);
  }

  get categoryName(): string {
    return this.question ? this.categories.nameOf(this.question.categoryId) : '';
  }

  get answerText(): string {
    if (!this.question || this.question.type === 'essay') {
      return '';
    }
    return this.question.answer.replace(/,/g, ' / ');
  }

  toggleFav(): void {
    if (!this.question) {
      return;
    }
    this.favorited = this.study.toggleFavorite(this.question.id);
  }
}
