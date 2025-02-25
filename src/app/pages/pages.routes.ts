import { Routes } from '@angular/router';

export const PAGES_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'access-information',
    pathMatch: 'full',
  },
  {
    path: 'access-information',
    loadComponent: () =>
      import(
        './access-information-page/access-information-page.component'
      ).then((c) => c.AccessInformationPageComponent),
  },
  {
    path: 'activity-history',
    loadComponent: () =>
      import('./activity-history-page/activity-history-page.component').then(
        (c) => c.ActivityHistoryPageComponent
      ),
  },
  {
    path: 'branch',
    loadComponent: () =>
      import('./branch-page/branch-page.component').then(
        (c) => c.BranchPageComponent
      ),
  },
  {
    path: 'commission',
    loadComponent: () =>
      import('./commission-page/commission-page.component').then(
        (c) => c.CommissionPageComponent
      ),
  },
  {
    path: 'credit-proposals',
    loadComponent: () =>
      import('./credit-proposals-page/credit-proposals-page.component').then(
        (c) => c.CreditProposalsPageComponent
      ),
  },
  {
    path: 'general-information',
    loadComponent: () =>
      import(
        './general-information-page/general-information-page.component'
      ).then((c) => c.GeneralInformationPageComponent),
  },
  {
    path: 'permissions',
    loadComponent: () =>
      import('./permissions-page/permissions-page.component').then(
        (c) => c.PermissionsPageComponent
      ),
  },
  {
    path: 'sales-assistant',
    loadComponent: () =>
      import('./sales-assistant-page/sales-assistant-page.component').then(
        (c) => c.SalesAssistantPageComponent
      ),
  },
  {
    path: 'service',
    loadComponent: () =>
      import('./service-page/service-page.component').then(
        (c) => c.ServicePageComponent
      ),
  },
];
