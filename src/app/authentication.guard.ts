import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthguardServiceService } from './services/authguard-service.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ):
  //   | Observable<boolean | UrlTree>
  //   | Promise<boolean | UrlTree>
  //   | boolean
  //   | UrlTree {
  //   return true;
  // }

  constructor(
    private Authguardservice: AuthguardServiceService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.Authguardservice.getToken()) {
      this.router.navigateByUrl('/login');
    }
    return this.Authguardservice.getToken();
  }
}
