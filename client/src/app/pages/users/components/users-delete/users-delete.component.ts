
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';

import {ApiService, UsersService, UserService} from '../../../../services/index';
import {NotificationsService} from 'angular2-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-delete',
  templateUrl: './users-delete.component.html',
  styleUrls: ['./users-delete.component.css']
})
export class UsersDeleteComponent {
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
  constructor(public dialogRef: MatDialogRef<UsersDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: UsersService,
              public notificationsService: NotificationsService,
              public apiService:ApiService,
              public userService:UserService,
              public router:Router) {


  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {

    this.dataService.deleteUser(this.data._id).then((data)=>{
      this.dialogRef.close(1);
    }, (err)=>{
      this.notificationsService.error("Users", err.error.message, this.options);
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
