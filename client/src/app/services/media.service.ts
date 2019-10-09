import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Media} from '../models/media.model';
//import { AdminsListConfig } from '../models/admins-list-config.model';
import { ApiService } from './api.service';

//const _ = require('lodash');

import * as _ from 'lodash';

@Injectable()
export class MediaService {

  dataChange: BehaviorSubject<Media[]> = new BehaviorSubject<Media[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient, private apiService: ApiService) {}

  get data(): Media[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllMedia(): Observable<any> {

    let params={};
    let path='/media';
    return this.apiService
      .get(
        (`/media`), new HttpParams(params)
      ).map(data => {
        this.dataChange.next(data);
        return data;
      }).catch((error)=>{
        return error;
      });
  }

  addMedia (media: FormData): Observable<any> {
    return this.apiService
      .postPhoto(
        ('/media'), media
      ).map(data => {
        return data;
      }).catch((error)=>{
        return error;
      });
  }

  deleteMedia (id: string): any {

    this.apiService
      .delete(
        (`/media/${id}`)
      ).subscribe(data => {
        this.dialogData = data;
        return data;
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
        return error;
      });
  }
}



/* REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:

 // ADD, POST METHOD
 addItem(kanbanItem: KanbanItem): void {
 this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
 this.dialogData = kanbanItem;
 this.toasterService.showToaster('Successfully added', 3000);
 },
 (err: HttpErrorResponse) => {
 this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
 });
 }

 // UPDATE, PUT METHOD
 updateItem(kanbanItem: KanbanItem): void {
 this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
 this.dialogData = kanbanItem;
 this.toasterService.showToaster('Successfully edited', 3000);
 },
 (err: HttpErrorResponse) => {
 this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
 }
 );
 }

 // DELETE METHOD
 deleteItem(id: number): void {
 this.httpClient.delete(this.API_URL + id).subscribe(data => {
 console.log(data['']);
 this.toasterService.showToaster('Successfully deleted', 3000);
 },
 (err: HttpErrorResponse) => {
 this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
 }
 );
 }
 */




