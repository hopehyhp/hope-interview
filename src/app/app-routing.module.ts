import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { roleGuard } from './core/guards/role.guard';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { AdminDashboardComponent } from './pages/admin/dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/dashboard/user-dashboard.component';
import { examSessionGuard } from './core/guards/exam-session.guard';
import { CategoryManageComponent } from './pages/admin/categories/category-manage.component';
import { QuestionManageComponent } from './pages/admin/questions/question-manage.component';
import { UserManageComponent } from './pages/admin/users/user-manage.component';
import { QuestionBrowseComponent } from './pages/user/questions/question-browse.component';
import { QuestionDetailComponent } from './pages/user/questions/question-detail.component';
import { ExamHomeComponent } from './pages/user/exam/exam-home.component';
import { ExamTakeComponent } from './pages/user/exam/exam-take.component';
import { ExamResultComponent } from './pages/user/exam/exam-result.component';
import { WrongBookComponent } from './pages/user/wrong/wrong-book.component';
import { ProfileComponent } from './pages/shared/profile/profile.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'admin',
        canActivate: [roleGuard],
        data: { roles: ['admin'] },
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: AdminDashboardComponent, data: { title: '工作台' } },
          { path: 'questions', component: QuestionManageComponent, data: { title: '题库管理' } },
          { path: 'categories', component: CategoryManageComponent, data: { title: '分类管理' } },
          { path: 'users', component: UserManageComponent, data: { title: '用户管理' } },
          { path: 'profile', component: ProfileComponent, data: { title: '个人中心' } }
        ]
      },
      {
        path: 'user',
        canActivate: [roleGuard],
        data: { roles: ['user'] },
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: UserDashboardComponent, data: { title: '学习首页' } },
          { path: 'questions/:id', component: QuestionDetailComponent, data: { title: '题目详情' } },
          { path: 'questions', component: QuestionBrowseComponent, data: { title: '题库浏览' } },
          { path: 'exam/take', component: ExamTakeComponent, canActivate: [examSessionGuard], data: { title: '在线答题' } },
          { path: 'exam/result/:id', component: ExamResultComponent, data: { title: '答题结果' } },
          { path: 'exam', component: ExamHomeComponent, data: { title: '在线答题' } },
          { path: 'wrong', component: WrongBookComponent, data: { title: '错题本' } },
          { path: 'profile', component: ProfileComponent, data: { title: '个人中心' } }
        ]
      }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
