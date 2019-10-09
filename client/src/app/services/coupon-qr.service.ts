import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {CouponQR} from '../models/coupon-qr.model';
//import { AdminsListConfig } from '../models/admins-list-config.model';
import { ApiService } from './api.service';

@Injectable()
export class CouponQRService {

  dataChange: BehaviorSubject<CouponQR[]> = new BehaviorSubject<CouponQR[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient, private apiService: ApiService) {}

  get data(): CouponQR[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllCouponsQR(couponID): any {

    let params={};
    let path=`/coupons/${couponID}/qr`;
    this.apiService
      .get(
        (path),
        new HttpParams(params)
      ).subscribe(data => {
        this.dataChange.next(data.couponQR);
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
  addCouponQR (couponID, totalQR): Promise<any> {
    let body = {qrStatus: 0, total_qr: totalQR};

    var promies = new Promise((resolve, reject)=>{
      this.apiService
        .post(
          (`/coupons/${couponID}/qr`), body
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

  //updateCoupon (user: Coupons): void {
  //  //this.dialogData = admin;
  //  this.apiService
  //    .put(
  //      ('/coupons/'+user._id), user
  //    ).subscribe(data => {
  //      this.dialogData = data;
  //    },
  //    (error: HttpErrorResponse) => {
  //      console.log (error.name + ' ' + error.message);
  //    });
  //}
  //
  deleteCouponQR (couponID: string, couponQRID: string): any {

    this.apiService
      .delete(
        (`/coupons/${couponID}/qr/${couponQRID}`)
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




