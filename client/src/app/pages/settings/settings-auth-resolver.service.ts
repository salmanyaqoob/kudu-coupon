import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { UserService } from '../../services/user.service';

@Injectable()
export class SettingsAuthResolver implements Resolve<boolean> {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    //if(!this.userService.isAuthenticated.take(1)){
    //  console.log("false");
    //  this.router.navigate(['login']);
    //  return Observable.of(false);
    //} else {
    //  console.log("true");
    //  return Observable.of(true);
    //}
    //


    var isAuthenticated = false;

    // Check if the user is authenticated
    this.userService.isAuthenticatedUser(this.userService.isAuthenticated.take(1)).subscribe( (data)=> {
      isAuthenticated = data;
    });

    // If the user is not authenticated, redirect to Login page
    if (!isAuthenticated) {
      this.router.navigateByUrl('/');
    }

    return this.userService.isAuthenticated.take(1);

  }
}
