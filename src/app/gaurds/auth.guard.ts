import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ApiService } from '../Components/api.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const apiService = inject(ApiService);
  const token = localStorage.getItem('token');
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const Role = apiService.getRole();
  if (token && isLoggedIn && Role === 'SUPER_ADMIN') {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};

export const managerGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const apiService = inject(ApiService);
  const token = localStorage.getItem('token');
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const Role = apiService.getRole();

  if (token && isLoggedIn && Role === 'MANAGER') {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const apiService = inject(ApiService);
  const token = localStorage.getItem('token');
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const Role = apiService.getRole();

  if (!token && !isLoggedIn) {
    return true;
  } else {
    if(Role === 'SUPER_ADMIN') router.navigate(['/admin']);
    else if(Role === 'MANAGER') router.navigate(['/manager']);
    else if (Role === 'USER') router.navigate(['/']);
    else router.navigate(['/']);
    return false;
  }



};




