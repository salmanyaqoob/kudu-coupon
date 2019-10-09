/**
 * Created by Salman on 1/10/2018.
 */

import { Routes, RouterModule } from '@angular/router';

import {AdminsListComponent} from "../components/admins-list/admins-list.component";
import {AdminsAddComponent} from "../components/admins-add/admins-add.component";
import {AdminsEditComponent} from "../components/admins-edit/admins-edit.component";

import { AdminsAuthResolver } from '../admins-auth-resolver.service';


export const adminsRoutes: Routes = [
  {
    path: '',
    resolve: {
      isAuthenticated: AdminsAuthResolver
    },
    children: [
      { path: 'list', component: AdminsListComponent, data:{title :"Admins List"},
        resolve: {
          isAuthenticated: AdminsAuthResolver
        }
      },
      { path: 'add', component: AdminsAddComponent, data:{title :"Add Admin"},
        resolve: {
          isAuthenticated: AdminsAuthResolver
        }
      },
      { path: 'edit', component: AdminsEditComponent, data:{title :"Edit Admin"},
        resolve: {
          isAuthenticated: AdminsAuthResolver
        }
      }
    ]
  }
];
