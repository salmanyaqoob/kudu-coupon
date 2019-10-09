import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Prizes} from '../models/prizes.model';
//import { AdminsListConfig } from '../models/admins-list-config.model';
import { ApiService } from './api.service';

@Injectable()
export class PrizesService {

  dataChange: BehaviorSubject<Prizes[]> = new BehaviorSubject<Prizes[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient, private apiService: ApiService) {}

  get data(): Prizes[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllPrizes(): void {

    let params={};
    let path='/prizes';
    this.apiService
      .get(
        (path),
        new HttpParams(params)
      ).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        return error;
      });
  }

  // DEMO ONLY, you can find working methods below
  addPrize (prize: Prizes): Promise<any> {

    var promies = new Promise((resolve, reject)=>{
      this.apiService
        .post(
          ('/prizes'), prize
        ).subscribe(data => {
          prize._id = data._id;
          prize.total_quantity_consumed = 0;
          prize.createdAt = data.createdAt;
          this.dialogData = prize;
          resolve(data);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        });
    });
    return promies;
  }

  updatePrize (prize: Prizes): Promise<any> {
    //this.dialogData = admin;
    var promies = new Promise((resolve, reject)=>{
      this.apiService
        .put(
          ('/prizes/'+prize._id), prize
        ).subscribe(data => {
          this.dialogData = prize;
          resolve(data);
        },
        (error: HttpErrorResponse) => {
          reject(error);
        });
    });
    return promies;
  }

  deletePrize (id: string):  Promise<any> {

    var promies = new Promise((resolve, reject)=>{
      this.apiService
        .delete(
          ('/prizes/'+id)
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
