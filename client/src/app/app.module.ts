import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import {SharedModule} from './shared/shared.module';
import {MenuItems} from './shared/menu-items/menu-items';
import {BreadcrumbsComponent} from './layout/admin/breadcrumbs/breadcrumbs.component';


import {AuthGuard} from "./services/auth-guard.service";
import {UserService} from "./services/user.service";
import {ApiService} from "./services/api.service";
import {JwtService} from "./services/jwt.service";
import {AdminsService} from './services/admins.service';
import {UsersService} from './services/users.service';
import {CouponsService} from './services/coupons.service';
import {CouponQRService} from './services/coupon-qr.service';
import {MediaService} from './services/media.service';
import {PrizesService} from './services/prizes.service';
import {SnackBarService} from './services/snackBar.service';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    BreadcrumbsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [MenuItems, AuthGuard, UserService, ApiService, JwtService, AdminsService, UsersService,
    CouponsService, CouponQRService, SnackBarService, MediaService, PrizesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
