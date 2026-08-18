import { Component } from '@angular/core';
import { ThemeName } from '../../core/models/user.model';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent {
  constructor(private readonly theme: ThemeService) {}

  get current(): ThemeName {
    return this.theme.current;
  }

  set(name: ThemeName): void {
    this.theme.set(name);
  }
}
