import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeName } from '../models/user.model';

const THEME_KEY = 'hope_theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly theme$ = new BehaviorSubject<ThemeName>(this.read());

  readonly current$ = this.theme$.asObservable();

  get current(): ThemeName {
    return this.theme$.value;
  }

  constructor() {
    this.apply(this.theme$.value);
  }

  set(theme: ThemeName): void {
    localStorage.setItem(THEME_KEY, theme);
    this.apply(theme);
    this.theme$.next(theme);
  }

  private apply(theme: ThemeName): void {
    document.documentElement.setAttribute('data-theme', theme);
  }

  private read(): ThemeName {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === 'purple' ? 'purple' : 'blue';
  }
}
