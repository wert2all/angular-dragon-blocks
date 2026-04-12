import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CenterLayout } from './layout/center-layout';
import { Header } from './layout/header/header';
import { Helper } from './features/helper/helper';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CenterLayout, Header, Helper],
  template: `
    <app-header />
    <app-center-layout>
      <router-outlet />
    </app-center-layout>
    <app-helper />
  `,
})
export class App {}
