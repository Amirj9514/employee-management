import { Routes } from '@angular/router';
import { authGuard } from './Shared/Guard/auth-guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [authGuard],
  },

  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'time-sheet',
    loadComponent: () => import('./time-sheet/time-sheet.page').then( m => m.TimeSheetPage),
     canActivate: [authGuard],
  },
  {
    path: 'notification',
    loadComponent: () => import('./notification/notification.page').then( m => m.NotificationPage),
     canActivate: [authGuard],
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

];
