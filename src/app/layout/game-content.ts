import { Component } from '@angular/core';

@Component({
  selector: 'app-game-content',
  imports: [],
  template: `
    <div class="w-480 h-270 min-w-480 min-h-270 max-w-480 max-h-270">
      <ng-content />
    </div>
  `,
})
export class GameContent {}
