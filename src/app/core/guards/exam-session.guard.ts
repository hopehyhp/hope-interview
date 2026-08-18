import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ExamService } from '../services/exam.service';

export const examSessionGuard: CanActivateFn = () => {
  const exam = inject(ExamService);
  const router = inject(Router);
  return exam.currentSession() ? true : router.createUrlTree(['/user/exam']);
};
