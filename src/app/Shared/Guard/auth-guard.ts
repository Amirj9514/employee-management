import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

export const authGuard: CanActivateFn = (route, state) => {
  const navCtrl = inject(NavController);
  const storedData = localStorage.getItem('sharedData@EMPLOYEEMANAGEMENT');

  try {
    const parsed = JSON.parse(storedData || '{}');

    if (parsed?.userData && parsed?.userData?.username) {
      return true;
    }
  } catch (error) {
    console.error('Error parsing sharedData', error);
  }

  // If no valid data, redirect to login
  navCtrl.navigateRoot('/login');
  return false;
};
