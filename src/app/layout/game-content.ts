import { Component } from '@angular/core';

@Component({
  selector: 'app-game-content',
  imports: [],
  template: `
    <div
      class="w-480 h-270 min-w-480 min-h-270 max-w-480 max-h-270 border-4 border-[#fa891a] shadow-[0_0_20px_0_#fa891a]"
    >
      <ng-content />
    </div>
  `,
})
export class GameContent {}
