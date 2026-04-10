import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CenterLayout } from './layout/center-layout';
import { GameContent } from './layout/game-content';
import { Header } from './layout/header/header';
import { Helper } from './features/helper/helper';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CenterLayout, GameContent, Header, Helper],
  template: `
    <app-header />
    <app-center-layout>
      <app-game-content>
        <router-outlet />
      </app-game-content>
    </app-center-layout>
    <app-helper />
  `,
})
export class App {}
