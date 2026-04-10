import { Component } from '@angular/core';

@Component({
  selector: 'app-game-content',
  imports: [],
  template: `
    <div
      class="border-4 border-vibrant-orange bg-warm-cream rounded-2xl relative w-full mx-auto overflow-y-scroll min-h-[480px]"
    >
      <ng-content />
    </div>
  `,
})
export class GameContent {}
