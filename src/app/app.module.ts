import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { ThemeSwitcherComponent } from './shared/theme-switcher/theme-switcher.component';
import { AuthShellComponent } from './pages/auth/auth-shell/auth-shell.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { AdminDashboardComponent } from './pages/admin/dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/dashboard/user-dashboard.component';
import { PlaceholderComponent } from './pages/shared/placeholder/placeholder.component';
import { ProfileComponent } from './pages/shared/profile/profile.component';
import { CategoryManageComponent } from './pages/admin/categories/category-manage.component';
import { QuestionManageComponent } from './pages/admin/questions/question-manage.component';
import { UserManageComponent } from './pages/admin/users/user-manage.component';
import { QuestionBrowseComponent } from './pages/user/questions/question-browse.component';
import { QuestionDetailComponent } from './pages/user/questions/question-detail.component';
import { ExamHomeComponent } from './pages/user/exam/exam-home.component';
import { ExamTakeComponent } from './pages/user/exam/exam-take.component';
import { ExamResultComponent } from './pages/user/exam/exam-result.component';
import { WrongBookComponent } from './pages/user/wrong/wrong-book.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ThemeSwitcherComponent,
    AuthShellComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    PlaceholderComponent,
    ProfileComponent,
    CategoryManageComponent,
    QuestionManageComponent,
    UserManageComponent,
    QuestionBrowseComponent,
    QuestionDetailComponent,
    ExamHomeComponent,
    ExamTakeComponent,
    ExamResultComponent,
    WrongBookComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
