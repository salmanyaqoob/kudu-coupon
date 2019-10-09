
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';

import {ApiService, PrizesService, UserService} from '../../../../services/index';

import {NotificationsService} from 'angular2-notifications';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-prizes-delete',
  templateUrl: './prizes-delete.component.html',
  styleUrls: ['./prizes-delete.component.css']
})
export class PrizesDeleteComponent {
  site_url = environment.site_url;
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
  constructor(public dialogRef: MatDialogRef<PrizesDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: PrizesService,
              public notificationsService: NotificationsService,
              public apiService:ApiService,
              public userService:UserService,
              public router:Router) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {

    this.dataService.deletePrize(this.data._id).then((data)=>{
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
