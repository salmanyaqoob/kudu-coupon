import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './layout/admin/admin.component';
import {AuthComponent} from './layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadChildren: './pages/login/login.module#LoginModule'
      }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: './pages/home/home.module#HomeModule'
      },
      {
        path: 'admins',
        data: {
          title: "Admins"
        },
        loadChildren: "./pages/admins/admins.module#AdminsModule",
      },
      {
        path: 'users',
        data: {
          title: "Users"
        },
        loadChildren: "./pages/users/users.module#UsersModule",
      },
      {
        path: 'coupons',
        data: {
          title: "Coupons"
        },
        loadChildren: "./pages/coupons/coupons.module#CouponsModule",
      },
      {
        path: 'prizes',
        data: {
          title: "Prizes"
        },
        loadChildren: "./pages/prizes/prizes.module#PrizesModule",
      },
      {
        path: 'settings',
        data: {
          title: "Settings"
        },
        loadChildren: "./pages/settings/settings.module#SettingsModule",
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
