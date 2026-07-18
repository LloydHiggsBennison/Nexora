import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'servicios/nexpulse',
    loadComponent: () =>
      import('./pages/services/nexpulse/nexpulse').then(m => m.Nexpulse)
  },
  {
    path: 'servicios/nexorder',
    loadComponent: () =>
      import('./pages/services/nexorder/nexorder').then(m => m.Nexorder)
  },
  {
    path: 'servicios/nexqueue',
    loadComponent: () =>
      import('./pages/services/nexqueue/nexqueue').then(m => m.Nexqueue)
  },
  {
    path: 'servicios/nexsite',
    loadComponent: () =>
      import('./pages/services/nexsite/nexsite').then(m => m.Nexsite)
  },
  {
    path: 'servicios/nexbi',
    loadComponent: () =>
      import('./pages/services/nexbi/nexbi').then(m => m.Nexbi)
  },
  {
    path: 'servicios/nexcore',
    loadComponent: () =>
      import('./pages/services/nexcore/nexcore').then(m => m.Nexcore)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
