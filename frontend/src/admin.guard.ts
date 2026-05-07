import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {

  const router = new Router();

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if (!user) {
    router.navigate(['/']);
    return false;
  }

  if (user.role !== 'admin') {
    router.navigate(['/home']);
    return false;
  }

  return true;
};