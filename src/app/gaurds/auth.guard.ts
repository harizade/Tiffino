import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if (token && isLoggedIn) {
    return true;
  } else {
    router.navigate(['/admin_login']);
    return false;
  }
};
