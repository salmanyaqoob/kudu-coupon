import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Coupons} from '../models/coupons.model';
//import { AdminsListConfig } from '../models/admins-list-config.model';
import { ApiService } from './api.service';

@Injectable()
export class CouponsService {

  dataChange: BehaviorSubject<Coupons[]> = new BehaviorSubject<Coupons[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient, private apiService: ApiService) {}

  get data(): Coupons[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllCoupons(): void {

    let params={};
    let path='/coupons';
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
  addCoupon (coupon: Coupons): Promise<any> {

    var promies = new Promise((resolve, reject)=>{
      this.apiService
        .post(
          ('/coupons'), coupon
        ).subscribe(data => {
          let newData:Coupons = data.body.coupon;
          this.dialogData = newData;
          resolve(data);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        });
    });
    return promies;
  }

  updateCoupon (coupon: Coupons): Promise<any> {
    //this.dialogData = admin;
    var promies = new Promise((resolve, reject)=>{
      this.apiService
        .put(
          ('/coupons/'+coupon._id), coupon
        ).subscribe(data => {
          this.dialogData = coupon;
          resolve(data);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        });
    });
    return promies;
  }

  deleteCoupon (id: string):  Promise<any> {
    var promies = new Promise((resolve, reject)=>{
      this.apiService
        .delete(
          ('/coupons/'+id)
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




