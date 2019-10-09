/**
 * Created by Salman on 1/10/2018.
 */
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {CouponsListComponent} from "./components/coupons-list/coupons-list.component";
import {CouponsAddComponent} from "./components/coupons-add/coupons-add.component";
import {CouponsEditComponent} from "./components/coupons-edit/coupons-edit.component";
import {CouponsDeleteComponent} from "./components/coupons-delete/coupons-delete.component";

import { CouponsQrAddComponent } from './components/qr/coupons-qr-add/coupons-qr-add.component';
import { CouponsQrDeleteComponent } from './components/qr/coupons-qr-delete/coupons-qr-delete.component';
import { CouponsQrListComponent } from './components/qr/coupons-qr-list/coupons-qr-list.component';

import {MaterialModule} from "../../material.module";
import { SharedModule } from '../../shared/shared.module';

import { couponRoutes }       from './routing/coupons.route';
import { CouponsAuthResolver } from './coupons-auth-resolver.service';
const couponRouting: ModuleWithProviders = RouterModule.forChild(couponRoutes);

import {SimpleNotificationsModule} from 'angular2-notifications';

@NgModule({
  imports: [
    CommonModule,
    couponRouting,
    MaterialModule,
    SharedModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [
    CouponsListComponent,
    CouponsAddComponent,
    CouponsEditComponent,
    CouponsDeleteComponent,
    CouponsQrAddComponent,
    CouponsQrDeleteComponent,
    CouponsQrListComponent
  ],
  providers:[
    CouponsAuthResolver
  ]
})
export class CouponsModule { }
