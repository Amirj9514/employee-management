import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'time-sheet',
    pathMatch: 'full',
  },
  // {
  //   path: 'login',
  //   loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  // },
  {
    path: 'time-sheet',
    loadComponent: () => import('./time-sheet/time-sheet.page').then( m => m.TimeSheetPage)
  },  {
    path: 'notification',
    loadComponent: () => import('./notification/notification.page').then( m => m.NotificationPage)
  },

];
