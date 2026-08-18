import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { SessionUser } from '../core/models/user.model';
import { AuthService } from '../core/services/auth.service';

interface MenuItem {
  path: string;
  label: string;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  user: SessionUser | null = this.auth.currentUser();
  pageTitle = '';
  menus: MenuItem[] = [];
  private sub?: Subscription;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const sub = this.auth.currentUser$.subscribe((user) => {
      this.user = user;
      this.menus = user?.role === 'admin' ? this.adminMenus() : this.userMenus();
    });
    sub.add(
      this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
        this.syncTitle();
      })
    );
    this.sub = sub;
    this.syncTitle();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  get initials(): string {
    const name = this.user?.displayName || this.user?.username || '';
    return name.slice(0, 1).toUpperCase();
  }

  logout(): void {
    this.auth.logout();
    void this.router.navigateByUrl('/login');
  }

  private syncTitle(): void {
    let current = this.route;
    while (current.firstChild) {
      current = current.firstChild;
    }
    this.pageTitle = (current.snapshot.data['title'] as string) || '';
  }

  private adminMenus(): MenuItem[] {
    return [
      { path: '/admin/dashboard', label: '工作台' },
      { path: '/admin/questions', label: '题库管理' },
      { path: '/admin/categories', label: '分类管理' },
      { path: '/admin/users', label: '用户管理' },
      { path: '/admin/profile', label: '个人中心' }
    ];
  }

  private userMenus(): MenuItem[] {
    return [
      { path: '/user/dashboard', label: '学习首页' },
      { path: '/user/questions', label: '题库浏览' },
      { path: '/user/exam', label: '在线答题' },
      { path: '/user/wrong', label: '错题本' },
      { path: '/user/profile', label: '个人中心' }
    ];
  }
}
