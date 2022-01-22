import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { Globals } from 'src/app/globals';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsEnterpriseGuard implements CanActivate {

  constructor(private _globals: Globals, private _router: Router, private _authGuard: AuthGuard) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this._globals.isEnterprise) {
      this._router.navigate(['/']);
      return false;
    }
    return true;
  }

}
