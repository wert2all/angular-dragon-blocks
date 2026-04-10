import { Component } from '@angular/core';

export type GameContentSize = 'sm' | 'lg' | 'xl';

@Component({
  selector: 'app-game-content',
  imports: [],
  template: `
    <div
      class="border-4 border-[#fa891a] shadow-[0_0_20px_0_#fa891a] relative w-full mx-auto overflow-y-scroll min-h-[480px]"
    >
      <ng-content />
    </div>
  `,
})
export class GameContent {}
