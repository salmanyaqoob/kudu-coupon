/**
 * Created by Salman on 1/10/2018.
 */

import { Routes, RouterModule } from '@angular/router';

import {UsersListComponent} from "../components/users-list/users-list.component";
import {UsersAddComponent} from "../components/users-add/users-add.component";
import {UsersEditComponent} from "../components/users-edit/users-edit.component";
import {UsersDeleteComponent} from "../components/users-delete/users-delete.component";

import { UsersAuthResolver } from '../users-auth-resolver.service';

export const usersRoutes: Routes = [
  {
    path: '',
    resolve: {
      isAuthenticated: UsersAuthResolver
    },
    children: [
      { path: 'list', component: UsersListComponent, data:{title :"Users List"},
        resolve: {
          isAuthenticated: UsersAuthResolver
        },
      },
      { path: 'add', component: UsersAddComponent, data:{title :"Add Users"},
        resolve: {
          isAuthenticated: UsersAuthResolver
        },
      },
      { path: 'edit', component: UsersEditComponent, data:{title :"Edit Users"},
        resolve: {
          isAuthenticated: UsersAuthResolver
        },
      },
      { path: 'delete', component: UsersDeleteComponent, data:{title :"Delete Users"},
        resolve: {
          isAuthenticated: UsersAuthResolver
        },
      }
    ]
  }
];
