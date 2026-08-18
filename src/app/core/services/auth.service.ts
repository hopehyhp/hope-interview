import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionUser, User, UserRole } from '../models/user.model';

const USERS_KEY = 'hope_users';
const SESSION_KEY = 'hope_session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly session$ = new BehaviorSubject<SessionUser | null>(this.readSession());

  readonly currentUser$ = this.session$.asObservable();

  constructor() {
    this.seed();
  }

  currentUser(): SessionUser | null {
    return this.session$.value;
  }

  isLoggedIn(): boolean {
    return !!this.session$.value;
  }

  homePath(role?: UserRole): string {
    const r = role ?? this.session$.value?.role;
    return r === 'admin' ? '/admin/dashboard' : '/user/dashboard';
  }

  login(username: string, password: string): { ok: boolean; message: string } {
    const user = this.readUsers().find(
      (item) => item.username === username.trim() && item.password === password
    );
    if (!user) {
      return { ok: false, message: '账号或密码不正确' };
    }
    const session: SessionUser = {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      role: user.role
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    this.session$.next(session);
    return { ok: true, message: '' };
  }

  register(payload: { username: string; displayName: string; password: string }): { ok: boolean; message: string } {
    const username = payload.username.trim();
    const users = this.readUsers();
    if (users.some((item) => item.username === username)) {
      return { ok: false, message: '该账号已被注册' };
    }
    const user: User = {
      id: Date.now().toString(),
      username,
      password: payload.password,
      displayName: payload.displayName.trim() || username,
      role: 'user'
    };
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return { ok: true, message: '' };
  }

  logout(): void {
    localStorage.removeItem(SESSION_KEY);
    this.session$.next(null);
  }

  updateDisplayName(displayName: string): { ok: boolean; message: string } {
    const session = this.session$.value;
    if (!session) {
      return { ok: false, message: '请先登录' };
    }
    const name = displayName.trim();
    if (!name) {
      return { ok: false, message: '请填写显示名称' };
    }
    if (name.length > 16) {
      return { ok: false, message: '显示名称最多 16 字' };
    }
    const users = this.readUsers().map((item) =>
      item.id === session.id ? { ...item, displayName: name } : item
    );
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    this.writeSession({ ...session, displayName: name });
    return { ok: true, message: '' };
  }

  changePassword(oldPassword: string, nextPassword: string): { ok: boolean; message: string } {
    const session = this.session$.value;
    if (!session) {
      return { ok: false, message: '请先登录' };
    }
    if (nextPassword.length < 6) {
      return { ok: false, message: '新密码至少 6 位' };
    }
    const users = this.readUsers();
    const current = users.find((item) => item.id === session.id);
    if (!current || current.password !== oldPassword) {
      return { ok: false, message: '原密码不正确' };
    }
    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(users.map((item) => (item.id === session.id ? { ...item, password: nextPassword } : item)))
    );
    return { ok: true, message: '' };
  }

  private writeSession(session: SessionUser): void {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    this.session$.next(session);
  }

  listUsers(): Omit<User, 'password'>[] {
    return this.readUsers().map((item) => ({
      id: item.id,
      username: item.username,
      displayName: item.displayName,
      role: item.role
    }));
  }

  countUsers(): number {
    return this.readUsers().length;
  }

  private seed(): void {
    if (localStorage.getItem(USERS_KEY)) {
      return;
    }
    const users: User[] = [
      { id: '1', username: 'admin', password: 'admin123', displayName: '管理员', role: 'admin' },
      { id: '2', username: 'user', password: 'user123', displayName: '学员', role: 'user' }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  private readUsers(): User[] {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || '[]') as User[];
    } catch {
      return [];
    }
  }

  private readSession(): SessionUser | null {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? (JSON.parse(raw) as SessionUser) : null;
    } catch {
      return null;
    }
  }
}
