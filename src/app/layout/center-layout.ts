import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-center-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="flex min-h-screen items-center justify-center px-24">
      <ng-content />
    </div>
  `,
})
export class CenterLayout {}
