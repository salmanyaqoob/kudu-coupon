/**
 * Created by Salman on 1/10/2018.
 */

import { Routes, RouterModule } from '@angular/router';

import {HomeDashboardComponent} from "../components/home-dashboard/home-dashboard.component";


import { HomeAuthResolver } from '../home-auth-resolver.service';


export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeDashboardComponent,
    data:{title :"Home"},
    resolve: {
      isAuthenticated: HomeAuthResolver
    }
  }
];
