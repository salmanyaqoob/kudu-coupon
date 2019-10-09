/**
 * Created by Salman on 1/10/2018.
 */
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SettingProfileComponent } from "./components/setting-profile/setting-profile.component";

import {MaterialModule} from "../../material.module";
import { SharedModule } from '../../shared/shared.module';

import { settingsRoutes }       from './routing/settings.route';
import { SettingsAuthResolver } from './settings-auth-resolver.service';
const settingsRouting: ModuleWithProviders = RouterModule.forChild(settingsRoutes);

import {SimpleNotificationsModule} from 'angular2-notifications';

@NgModule({
  imports: [
    CommonModule,
    settingsRouting,
    MaterialModule,
    SharedModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [
    SettingProfileComponent
  ],
  providers:[
    SettingsAuthResolver
  ]
})
export class SettingsModule { }
