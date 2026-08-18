import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { CategoryService } from '../../../core/services/category.service';
import { QuestionService } from '../../../core/services/question.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  readonly name = this.auth.currentUser()?.displayName ?? '';

  constructor(
    private readonly auth: AuthService,
    private readonly categories: CategoryService,
    private readonly questions: QuestionService
  ) {}

  get stats() {
    return [
      { label: '题目总数', value: String(this.questions.count()) },
      { label: '分类数量', value: String(this.categories.count()) },
      { label: '注册用户', value: String(this.auth.countUsers()) },
      { label: '公开题目', value: String(this.questions.list({ enabledOnly: true }).length) }
    ];
  }
}
