/**
 * Created by Salman on 1/10/2018.
 */

import { Routes, RouterModule } from '@angular/router';

import {SettingProfileComponent} from "../components/setting-profile/setting-profile.component";
import { SettingsAuthResolver } from "../settings-auth-resolver.service";

export const settingsRoutes: Routes = [
  { path: '',
    resolve: {
      isAuthenticated: SettingsAuthResolver
    },
    children:[
      { path: 'profile', component: SettingProfileComponent, data:{title :"Profile Setting"},
        resolve: {
          isAuthenticated: SettingsAuthResolver
        }
      }
    ]

  }
];
