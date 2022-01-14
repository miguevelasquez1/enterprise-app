import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService
      .getUser()
      .then(user => {
        console.log(user, 'user');
        if (!user) {
          this.router.navigate(['/welcome-slide']);
          return false;
        }
        return true;
      })
      .catch(err => {
        console.log(err, 'err');
        return false;
      });
  }
}
