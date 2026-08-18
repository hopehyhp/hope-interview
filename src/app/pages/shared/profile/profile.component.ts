import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

function matchPassword(group: AbstractControl): ValidationErrors | null {
  const next = group.get('next')?.value;
  const confirm = group.get('confirm')?.value;
  return next && confirm && next !== confirm ? { mismatch: true } : null;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileMsg = '';
  passwordMsg = '';
  profileError = '';
  passwordError = '';

  readonly profileForm = this.fb.nonNullable.group({
    username: [{ value: this.auth.currentUser()?.username ?? '', disabled: true }],
    displayName: [this.auth.currentUser()?.displayName ?? '', [Validators.required, Validators.maxLength(16)]]
  });

  readonly passwordForm = this.fb.nonNullable.group(
    {
      old: ['', Validators.required],
      next: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', Validators.required]
    },
    { validators: matchPassword }
  );

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService
  ) {}

  saveProfile(): void {
    this.profileMsg = '';
    this.profileError = '';
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    const result = this.auth.updateDisplayName(this.profileForm.controls.displayName.value);
    if (!result.ok) {
      this.profileError = result.message;
      return;
    }
    this.profileMsg = '显示名称已更新';
  }

  savePassword(): void {
    this.passwordMsg = '';
    this.passwordError = '';
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }
    if (this.passwordForm.hasError('mismatch')) {
      this.passwordError = '两次新密码不一致';
      return;
    }
    const { old, next } = this.passwordForm.getRawValue();
    const result = this.auth.changePassword(old, next);
    if (!result.ok) {
      this.passwordError = result.message;
      return;
    }
    this.passwordForm.reset({ old: '', next: '', confirm: '' });
    this.passwordMsg = '密码已更新';
  }
}
