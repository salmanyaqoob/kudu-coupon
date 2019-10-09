/**
 * Created by Salman on 1/10/2018.
 */
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {HomeDashboardComponent} from "./components/home-dashboard/home-dashboard.component";

import { homeRoutes }       from './routing/home.route';
import { HomeAuthResolver } from './home-auth-resolver.service';
const homeRouting: ModuleWithProviders = RouterModule.forChild(homeRoutes);

import { MaterialModule } from "../../material.module";
import { SharedModule } from '../../shared/shared.module';

import {ChartModule} from 'angular2-chartjs';
import {SimpleNotificationsModule} from 'angular2-notifications';

@NgModule({
  imports: [
    CommonModule,
    homeRouting,
    MaterialModule,
    SharedModule,
    ChartModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [
    HomeDashboardComponent,
  ],
  providers:[
    HomeAuthResolver
  ]
})
export class HomeModule { }
