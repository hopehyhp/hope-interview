import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

function matchPassword(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm = group.get('confirm')?.value;
  return password && confirm && password !== confirm ? { mismatch: true } : null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  submitting = false;
  error = '';

  readonly form = this.fb.nonNullable.group(
    {
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9_]+$/)]],
      displayName: ['', [Validators.required, Validators.maxLength(16)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required]]
    },
    { validators: matchPassword }
  );

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  fieldError(name: 'username' | 'displayName' | 'password' | 'confirm'): string {
    const control = this.form.controls[name];
    if (!control.touched) {
      return '';
    }
    if (control.hasError('required')) {
      const messages = {
        username: '请输入账号',
        displayName: '请输入显示名称',
        password: '请输入密码',
        confirm: '请再次输入密码'
      };
      return messages[name];
    }
    if (control.hasError('minlength')) {
      return name === 'username' ? '账号至少 3 位' : '密码至少 6 位';
    }
    if (control.hasError('maxlength')) {
      return '显示名称最多 16 字';
    }
    if (control.hasError('pattern')) {
      return '账号仅支持字母、数字和下划线';
    }
    if (control.hasError('auth')) {
      return this.error || '该账号已被注册';
    }
    if (name === 'confirm' && this.form.hasError('mismatch')) {
      return '两次密码不一致';
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
    const { username, displayName, password } = this.form.getRawValue();
    const result = this.auth.register({ username, displayName, password });
    this.submitting = false;
    if (!result.ok) {
      this.error = result.message;
      this.form.controls.username.setErrors({ auth: true });
      this.form.controls.username.markAsTouched();
      return;
    }
    this.auth.login(username, password);
    void this.router.navigateByUrl(this.auth.homePath());
  }
}
