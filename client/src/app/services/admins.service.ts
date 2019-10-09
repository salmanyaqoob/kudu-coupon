import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Admins} from '../models/admins.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AdminsListConfig } from '../models/admins-list-config.model';
import { ApiService } from './api.service';

@Injectable()
export class AdminsService {
  //private readonly API_URL = 'http://localhost:4040/api/admins';

  dataChange: BehaviorSubject<Admins[]> = new BehaviorSubject<Admins[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient, private apiService: ApiService) {}

  get data(): Admins[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllAdmins(): void {

    let params={};
    let path='/admins';
    this.apiService
      .get(
        (path),
        new HttpParams(params)
      ).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
  }

  query(config: AdminsListConfig): void {
    // Convert any filters over to Angular's URLSearchParams
    const params = {};

    Object.keys(config.filters)
      .forEach((key) => {
        params[key] = config.filters[key];
      });

    this.apiService
      .get(
        //'/articles' + ((config.type === 'feed') ? '/feed' : ''),
        '/admins',
        new HttpParams(params)
      )
      .subscribe(data => {
          this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log (error.name + ' ' + error.message);
        });
      //.map(data =>  this.dataChange.next(data));
  }


  // DEMO ONLY, you can find working methods below
  addAdmin (admin: Admins): Promise<any> {
    var promies = new Promise((resolve, reject)=>{
      this.apiService
        .post(
          ('/admins'), admin
        ).subscribe(data => {
          this.dialogData = admin;
          resolve(data);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        });
    });
    return promies;
  }

  updateAdmin (admin: Admins): Promise<any> {
    //this.dialogData = admin;

    var promies = new Promise((resolve, reject)=>{
      this.apiService
        .put(
          ('/admins/'+admin._id), admin
        ).subscribe(data => {
          this.dialogData = admin;
          resolve(data);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        });
    });
    return promies;
  }

  deleteAdmin (id: number): void {
    console.log(id);
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




