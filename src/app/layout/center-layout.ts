import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-center-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="px-24 mt-24">
      <ng-content />
    </div>
  `,
})
export class CenterLayout {}
