import { Component } from '@angular/core';
import { UserRole } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent {
  constructor(private readonly auth: AuthService) {}

  get rows() {
    return this.auth.listUsers();
  }

  roleText(role: UserRole): string {
    return role === 'admin' ? '管理员' : '学员';
  }
}
