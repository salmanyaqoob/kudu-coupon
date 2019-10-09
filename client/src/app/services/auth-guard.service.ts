import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    //return this.userService.isAuthenticated;
    //
    var isAuthenticated = false;

    // Check if the user is authenticated
    this.userService.isAuthenticatedUser(this.userService.isAuthenticated.take(1)).subscribe( (data)=> {
      isAuthenticated = data;
    });

    // If the user is not authenticated, redirect to Login page
    if (!isAuthenticated) {
      this.router.navigate(['/']);
      //this.router.navigate([{ outlets: { login: null }}]);
    }

    return this.userService.isAuthenticated.take(1);

  }
}
