import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
//import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { JwtService } from './jwt.service';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    //private httpNative: Http,
    private router:Router
  ) {}

  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Expose-Headers': 'x-auth'
    };

    if (this.jwtService.getToken()) {
      headersConfig['Authorization'] = `Token ${this.jwtService.getToken()}`;
      headersConfig['x-auth'] = `${this.jwtService.getToken()}`;
    }
    return new HttpHeaders(headersConfig);
  }

  private formatErrors(error: any) {

    if (error.status > 399 &&  error.status <=500) {
      if(error.status === 401){
        //error.error.message = "Unauthorized user, login again";
        //this.router.navigate(['/']);
        console.log("Unauthorized user, login again");
        return Observable.throw(error);
      }
      console.log(error.status);
      return Observable.throw(error);
      //return Observable.throw(error);
    } else {
      return Observable.throw(error.json());
    }
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders(), params })
    .catch(this.formatErrors);
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors);
  }

  patch(path: string, body: Object = {}): Observable<any> {
    return this.http.patch(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
      )
      .catch(this.formatErrors);
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders(), observe: 'response' }
      //{headers: new HttpHeaders().set("Content-Type", "application/json"), observe: 'response'}
    )
    .catch(this.formatErrors);
  }

  postPhoto(path: string, body: FormData): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders(), observe: 'response' }
      //{headers: new HttpHeaders().set("Content-Type", "application/json"), observe: 'response'}
      )
      .catch(this.formatErrors);
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`,
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors);
  }

  isRequestAuthorized(status):boolean{
    if(status===401){
      return false;
    } else {
      return true;
    }
  }
}
