import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class StudyService {
  constructor(private readonly auth: AuthService) {}

  viewedIds(): string[] {
    return this.read('view');
  }

  favoriteIds(): string[] {
    return this.read('fav');
  }

  isFavorite(id: string): boolean {
    return this.favoriteIds().includes(id);
  }

  markViewed(id: string): void {
    const ids = this.viewedIds();
    if (!ids.includes(id)) {
      this.write('view', [id, ...ids]);
    }
  }

  toggleFavorite(id: string): boolean {
    const ids = this.favoriteIds();
    const next = ids.includes(id) ? ids.filter((item) => item !== id) : [id, ...ids];
    this.write('fav', next);
    return next.includes(id);
  }

  private key(kind: 'view' | 'fav'): string {
    return `hope_${kind}_${this.auth.currentUser()?.id ?? 'guest'}`;
  }

  private read(kind: 'view' | 'fav'): string[] {
    try {
      return JSON.parse(localStorage.getItem(this.key(kind)) || '[]') as string[];
    } catch {
      return [];
    }
  }

  private write(kind: 'view' | 'fav', ids: string[]): void {
    localStorage.setItem(this.key(kind), JSON.stringify(ids));
  }
}
