import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user?.token) return true;
      } catch (e) {
        console.error('Invalid currentUser data', e);
      }
    }

    // Return a UrlTree instead of navigating manually
    return this.router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url },
    });
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    // just reuse the same logic
    return this.canActivate(childRoute, state);
  }
}