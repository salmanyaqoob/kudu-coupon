/**
 * Created by Salman on 1/10/2018.
 */

import { Routes, RouterModule } from '@angular/router';

import {PrizesListComponent} from "../components/prizes-list/prizes-list.component";
import {PrizesAddComponent} from "../components/prizes-add/prizes-add.component";
import {PrizesEditComponent} from "../components/prizes-edit/prizes-edit.component";
import { PrizesDeleteComponent } from '../components/prizes-delete/prizes-delete.component';

import { PrizesAuthResolver } from '../prizes-auth-resolver.service';

export const prizesRoutes: Routes = [
  {
    path: '',
    resolve: {
      isAuthenticated: PrizesAuthResolver
    },
    children: [
      { path: 'list', component: PrizesListComponent, data:{title :"Prizes List"},
        resolve: {
          isAuthenticated: PrizesAuthResolver
        }
      },
      { path: 'add', component: PrizesAddComponent, data:{title :"Prizes Admin"},
        resolve: {
          isAuthenticated: PrizesAuthResolver
        }
      },
      { path: 'edit', component: PrizesEditComponent, data:{title :"Prizes Admin"},
        resolve: {
          isAuthenticated: PrizesAuthResolver
        }
      },
      { path: 'delete', component: PrizesDeleteComponent, data:{title :"Delete Admin"},
        resolve: {
          isAuthenticated: PrizesAuthResolver
        }
      }
    ]
  }
];
