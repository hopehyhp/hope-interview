export type UserRole = 'admin' | 'user';
export type ThemeName = 'blue' | 'purple';

export interface User {
  id: string;
  username: string;
  password: string;
  displayName: string;
  role: UserRole;
}

export interface SessionUser {
  id: string;
  username: string;
  displayName: string;
  role: UserRole;
}
