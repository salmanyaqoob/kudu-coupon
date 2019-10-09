
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {ApiService, CouponsService, UserService} from '../../../../services/index';

import {NotificationsService} from 'angular2-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coupons-delete',
  templateUrl: './coupons-delete.component.html',
  styleUrls: ['./coupons-delete.component.css']
})
export class CouponsDeleteComponent {
  options: any = {
    position: ['bottom', 'right'],
    timeOut: 1500,
    showProgressBar: true,
    pauseOnHover: true,
    lastOnBottom: true,
    clickToClose: true,
    preventDuplicates: false,
    preventLastDuplicates: false,
    theClass: 'bg-c-pink no-icon',
    rtl: false,
    animate: 'rotate'
  };
  constructor(public dialogRef: MatDialogRef<CouponsDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: CouponsService,
              public notificationsService: NotificationsService,
              public apiService:ApiService,
              public userService:UserService,
              public router:Router

  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {

    this.dataService.deleteCoupon(this.data._id).then((data)=>{
      this.dialogRef.close(1);
    }, (err)=>{
      this.notificationsService.error("Coupon", err.error.message, this.options);
      //this.snackBarService.openSnackBar(err.error.message, "error", 'error');

      if(err.status && err.status !== undefined && !this.apiService.isRequestAuthorized(err.status)){

        setTimeout(()=>{
          this.userService.purgeAuth();
          this.router.navigateByUrl('/');
          this.dialogRef.close(0);
        }, 2000);
      }

    });
  }
}
