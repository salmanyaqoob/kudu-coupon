import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//const _ = require('lodash');
import * as _ from 'lodash';
//import _ from "lodash";

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models/index';

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  @Output() getLoggedInUser: EventEmitter<any> = new EventEmitter();

  constructor (
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService
  ) {}



  isAuthenticatedUser(isAuthenticated): Observable<boolean> {
    setTimeout(() => { //Hack - find a way to change this
      this.isAuthenticatedSubject.next(isAuthenticated);
    });
    return this.isAuthenticatedSubject.asObservable();
  }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      //this.apiService.get('/users')
      //.subscribe(
      //  data => this.setAuth(data.user),
      //  err => this.purgeAuth()
      //);

      this.purgeAuth();

    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);

    this.getLoggedInUser.emit(user);

    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next(new User());
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type, credentials): Observable<User> {
    const route = (type === 'login') ? '/login' : '';
    return this.apiService.post('/auth/admin' + route,{email: credentials.email, password: credentials.password})
    .map(
      response => {
        let authHeader:any = response.headers.get('x-auth');
        let body = _.pick(response.body, ["email", "name", "role", "_id"]);
        body.token = authHeader;
        this.setAuth(body);
        return response;
      }
    );
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  update(user): Observable<User> {
    return this.apiService
    .put('/users', { user })
    .map(data => {
      // Update the currentUser observable
      this.currentUserSubject.next(data.user);
      return data.user;
    });
  }

  updateAdmin(user): Observable<User> {
    return this.apiService
      .put(`/admins/${user._id}`, user)
      .map(data => {
        let admin = _.pick(data.admin, ["email", "name", "role", "_id"]);
        // Update the currentUser observable
        this.currentUserSubject.next(admin);
        this.getLoggedInUser.emit(admin);
        return admin;
      });
  }

}
