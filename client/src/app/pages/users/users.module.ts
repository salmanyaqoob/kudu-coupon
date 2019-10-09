/**
 * Created by Salman on 1/10/2018.
 */
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {UsersListComponent} from "./components/users-list/users-list.component";
import {UsersAddComponent} from "./components/users-add/users-add.component";
import {UsersEditComponent} from "./components/users-edit/users-edit.component";
import {UsersDeleteComponent} from "./components/users-delete/users-delete.component";

import {MaterialModule} from "../../material.module";
import { SharedModule } from '../../shared/shared.module';

import {SimpleNotificationsModule} from 'angular2-notifications';

import { usersRoutes }       from './routing/users.route';
import { UsersAuthResolver } from './users-auth-resolver.service';
const usersRouting: ModuleWithProviders = RouterModule.forChild(usersRoutes);

@NgModule({
  imports: [
    CommonModule,
    usersRouting,
    MaterialModule,
    SharedModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [
    UsersListComponent,
    UsersAddComponent,
    UsersEditComponent,
    UsersDeleteComponent
  ],
  providers:[
    UsersAuthResolver
  ]
})
export class UsersModule { }
