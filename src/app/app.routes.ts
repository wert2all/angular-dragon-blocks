import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'map',
    loadComponent: () =>
      import('./pages/map/map-page.component').then((m) => m.MapPageComponent),
  },
  {
    path: 'quest/:id',
    loadComponent: () =>
      import('./pages/quest/quest').then((m) => m.Quest),
  },
];
