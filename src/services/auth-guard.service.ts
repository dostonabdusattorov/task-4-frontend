import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authSer: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (state.url === '/users') {
      if (this.authSer.isAuthenticatedUser) {
        return true;
      }

      this.router.navigate(['auth']);
      return false;
    }
    if (!this.authSer.isAuthenticatedUser) {
      return true;
    }

    this.router.navigate(['users']);
    return false;
  }
}
