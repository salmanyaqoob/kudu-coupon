/**
 * Created by Salman on 1/10/2018.
 */

import { Routes, RouterModule } from '@angular/router';

import {CouponsListComponent} from "../components/coupons-list/coupons-list.component";
import {CouponsAddComponent} from "../components/coupons-add/coupons-add.component";
import {CouponsEditComponent} from "../components/coupons-edit/coupons-edit.component";
import {CouponsDeleteComponent} from "../components/coupons-delete/coupons-delete.component";

import { CouponsQrAddComponent } from '../components/qr/coupons-qr-add/coupons-qr-add.component';
import { CouponsQrDeleteComponent } from '../components/qr/coupons-qr-delete/coupons-qr-delete.component';
import { CouponsQrListComponent } from '../components/qr/coupons-qr-list/coupons-qr-list.component';

import { CouponsAuthResolver } from '../coupons-auth-resolver.service';

export const couponRoutes: Routes = [
  {
    path: '',
    resolve: {
      isAuthenticated: CouponsAuthResolver
    },
    children: [
      { path: 'list', component: CouponsListComponent, data:{title :"Coupons List"},
        resolve: {
          isAuthenticated: CouponsAuthResolver
        },
      },
      { path: 'add', component: CouponsAddComponent, data:{title :"Add Coupon"},
        resolve: {
          isAuthenticated: CouponsAuthResolver
        },
      },
      { path: 'edit', component: CouponsEditComponent, data:{title :"Edit Coupon"},
        resolve: {
          isAuthenticated: CouponsAuthResolver
        },
      },
      { path: 'delete', component: CouponsDeleteComponent, data:{title :"Delete Coupon"},
        resolve: {
          isAuthenticated: CouponsAuthResolver
        },
      },
      { path: 'qr/list', component: CouponsQrListComponent, data:{title :"List Coupon QR"},
        resolve: {
          isAuthenticated: CouponsAuthResolver
        },
      },
      { path: 'qr/add', component: CouponsQrAddComponent, data:{title :"Add Coupon QR"},
        resolve: {
          isAuthenticated: CouponsAuthResolver
        },
      },
      { path: 'qr/delete', component: CouponsQrDeleteComponent, data:{title :"Delete Coupon QR"},
        resolve: {
          isAuthenticated: CouponsAuthResolver
        },
      }
    ]
  }
];
