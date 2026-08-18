import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  submitting = false;
  error = '';

  readonly form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  fieldError(name: 'username' | 'password'): string {
    const control = this.form.controls[name];
    if (!control.touched || !control.errors) {
      return '';
    }
    if (control.hasError('required')) {
      return name === 'username' ? '请输入账号' : '请输入密码';
    }
    if (control.hasError('minlength')) {
      return name === 'username' ? '账号至少 3 位' : '密码至少 6 位';
    }
    return '';
  }

  submit(): void {
    this.error = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    const { username, password } = this.form.getRawValue();
    const result = this.auth.login(username, password);
    this.submitting = false;
    if (!result.ok) {
      this.error = result.message;
      return;
    }
    void this.router.navigateByUrl(this.auth.homePath());
  }
}
