import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-center-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="flex h-dvh w-dvw items-center justify-center">
      <ng-content />
    </div>
  `,
})
export class CenterLayout {}
