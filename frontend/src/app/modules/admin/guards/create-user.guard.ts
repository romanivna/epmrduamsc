import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../../../shared/services';

@Injectable()
export class UserCreateGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAdminLoggedIn;
  }
}
