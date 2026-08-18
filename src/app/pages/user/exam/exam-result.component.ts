import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamRecord, TYPE_LABELS } from '../../../core/models/bank.model';
import { ExamService } from '../../../core/services/exam.service';

@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.scss']
})
export class ExamResultComponent implements OnInit {
  readonly typeLabels = TYPE_LABELS;
  record?: ExamRecord;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly exam: ExamService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.record = this.exam.recordOf(id);
    if (!this.record) {
      void this.router.navigateByUrl('/user/exam');
    }
  }

  get wrongCount(): number {
    return this.record?.items.filter((item) => item.scored && !item.correct).length ?? 0;
  }

  displayAnswer(value: string, type: string): string {
    if (type === 'essay') {
      return value || '未作答';
    }
    return value.replace(/,/g, ' / ') || '未作答';
  }
}
