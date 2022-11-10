import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

import { take, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class YaLogeadoGuard implements CanActivate {
  public usuario$: Observable<any> = this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.usuario$?.pipe(
      take(1),
      map((user) => {
        if (user) {
          this.router.navigate(['inicio']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
