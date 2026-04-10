import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CenterLayout } from './layout/center-layout';
import { GameContent } from './layout/game-content';
import { Header } from './layout/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CenterLayout, GameContent, Header],
  template: `
    <app-header />
    <app-center-layout>
      <app-game-content>
        <router-outlet />
      </app-game-content>
    </app-center-layout>
  `,
})
export class App {}
