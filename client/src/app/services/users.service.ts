import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Users} from '../models/users.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Errors } from '../models/errors.model';

//import { AdminsListConfig } from '../models/admins-list-config.model';
import { ApiService } from './api.service';

@Injectable()
export class UsersService {

  dataChange: BehaviorSubject<Users[]> = new BehaviorSubject<Users[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient, private apiService: ApiService) {}

  get data(): Users[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllUsers(): void {

    let params={};
    let path='/users';
    this.apiService
      .get(
        (path),
        new HttpParams(params)
      ).subscribe(data => {
        this.dataChange.next(data);
      },
      (error) => {
        return error;
        //console.log (error.name + ' ' + error.message);
      });
  }

  //query(config: AdminsListConfig): void {
  //  // Convert any filters over to Angular's URLSearchParams
  //  const params = {};
  //
  //  Object.keys(config.filters)
  //    .forEach((key) => {
  //      params[key] = config.filters[key];
  //    });
  //
  //  this.apiService
  //    .get(
  //      //'/articles' + ((config.type === 'feed') ? '/feed' : ''),
  //      '/users',
  //      new HttpParams(params)
  //    )
  //    .subscribe(data => {
  //        this.dataChange.next(data);
  //      },
  //      (error: HttpErrorResponse) => {
  //        console.log (error.name + ' ' + error.message);
  //      });
  //  //.map(data =>  this.dataChange.next(data));
  //}


  // DEMO ONLY, you can find working methods below
  addUser (user: Users): Promise<any> {
    var promies = new Promise((resolve, reject)=>{
      this.apiService
        .post(
          ('/users'), user
        ).subscribe(data => {
          this.dialogData = user;
          resolve(data);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        });
    });
    return promies;
  }

  updateUser (user: Users): Promise<any> {

    var promies = new Promise((resolve, reject)=>{
      this.apiService
        .patch(
          ('/users/'+user._id), user
        ).subscribe(data => {
          this.dialogData = user;
          resolve(data);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        });
    });
    return promies;
  }

  deleteUser (id: string): Promise<any> {

    var promies = new Promise((resolve, reject)=>{
      this.apiService
        .delete(
          ('/users/'+id)
        ).subscribe(data => {
          this.dialogData = data;
          resolve(data);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        });
    });
    return promies;
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




