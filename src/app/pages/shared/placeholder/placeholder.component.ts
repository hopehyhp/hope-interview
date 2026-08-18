import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss']
})
export class PlaceholderComponent {
  readonly title = (this.route.snapshot.data['title'] as string) || '功能模块';

  constructor(private readonly route: ActivatedRoute) {}
}
