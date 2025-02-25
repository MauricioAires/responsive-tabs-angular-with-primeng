import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/pages.routes').then((r) => r.PAGES_ROUTES),
      },
    ],
  },
];
