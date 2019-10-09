import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {MatSnackBar} from '@angular/material';

@Injectable()
export class SnackBarService {
  constructor (
    public snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string, action: string, config_class:string= "success") {
    let configs = {
      duration: 6000,
      panelClass: config_class
    };
    this.snackBar.open(message, action, configs);
  }

}
