import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ExamService } from '../../../core/services/exam.service';
import { QuestionService } from '../../../core/services/question.service';
import { StudyService } from '../../../core/services/study.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {
  readonly name = this.auth.currentUser()?.displayName ?? '';

  constructor(
    private readonly auth: AuthService,
    private readonly questions: QuestionService,
    private readonly study: StudyService,
    private readonly exam: ExamService
  ) {}

  get stats() {
    return [
      { label: '公开题目', value: String(this.questions.list({ enabledOnly: true }).length) },
      { label: '已学题目', value: String(this.study.viewedIds().length) },
      { label: '收藏题目', value: String(this.study.favoriteIds().length) },
      { label: '答题次数', value: String(this.exam.attemptCount()) }
    ];
  }
}
