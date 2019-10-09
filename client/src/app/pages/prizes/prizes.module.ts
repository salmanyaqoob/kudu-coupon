/**
 * Created by Salman on 1/10/2018.
 */
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {PrizesListComponent} from "./components/prizes-list/prizes-list.component";
import {PrizesAddComponent} from "./components/prizes-add/prizes-add.component";
import {PrizesEditComponent} from "./components/prizes-edit/prizes-edit.component";
import {PrizesDeleteComponent} from "./components/prizes-delete/prizes-delete.component";

import {MaterialModule} from "../../material.module";
import { SharedModule } from '../../shared/shared.module';

import {MediaLibraryModal} from "../../shared/media/media-library";
import { FileUploadModule } from 'ng2-file-upload';
import { BusyModule } from 'angular2-busy';

import { prizesRoutes }       from './routing/prizes.route';
import { PrizesAuthResolver } from './prizes-auth-resolver.service';
const prizeRouting: ModuleWithProviders = RouterModule.forChild(prizesRoutes);

import {SimpleNotificationsModule} from 'angular2-notifications';

@NgModule({
  imports: [
    CommonModule,
    prizeRouting,
    MaterialModule,
    SharedModule,
    FileUploadModule,
    BusyModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [
    PrizesListComponent,
    PrizesAddComponent,
    PrizesEditComponent,
    PrizesDeleteComponent,
    MediaLibraryModal
  ],
  providers:[
    PrizesAuthResolver
  ],
  entryComponents: [MediaLibraryModal]
})
export class PrizesModule { }
