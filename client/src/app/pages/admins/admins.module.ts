/**
 * Created by Salman on 1/10/2018.
 */
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {AdminsListComponent} from "./components/admins-list/admins-list.component";
import {AdminsAddComponent} from "./components/admins-add/admins-add.component";
import {AdminsEditComponent} from "./components/admins-edit/admins-edit.component";

import { adminsRoutes }       from './routing/admins.route';
import { AdminsAuthResolver } from './admins-auth-resolver.service';
const adminRouting: ModuleWithProviders = RouterModule.forChild(adminsRoutes);

import { MaterialModule } from "../../material.module";
import { SharedModule } from '../../shared/shared.module';

import {SimpleNotificationsModule} from 'angular2-notifications';

@NgModule({
  imports: [
    CommonModule,
    adminRouting,
    MaterialModule,
    SharedModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [
    AdminsListComponent,
    AdminsAddComponent,
    AdminsEditComponent
  ],
  providers:[
    AdminsAuthResolver
  ]
})
export class AdminsModule { }
