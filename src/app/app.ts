import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CenterLayout } from './layout/center-layout';
import { GameContent } from './layout/game-content';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CenterLayout, GameContent],
  template: `
    <app-center-layout>
      <app-game-content>
        <router-outlet />
      </app-game-content>
    </app-center-layout>
  `,
})
export class App {}
