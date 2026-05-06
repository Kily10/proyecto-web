import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {

  const router = new Router();

  const userStr = localStorage.getItem('user');

  if (!userStr) {
    router.navigate(['/']);
    return false;
  }

  try {
    const user = JSON.parse(userStr);

    if (!user?.id) {
      router.navigate(['/']);
      return false;
    }

    return true;

  } catch (e) {
    router.navigate(['/']);
    return false;
  }
};