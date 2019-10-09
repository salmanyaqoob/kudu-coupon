import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import {ApiService, UserService, SnackBarService} from '../../../../services/index';
import {User} from '../../../../models/user.model';

import {NotificationsService} from 'angular2-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting-profile',
  templateUrl: './setting-profile.component.html',
  styleUrls: ['./setting-profile.component.css']
})
export class SettingProfileComponent implements OnInit {
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
  data:User = null;
  myForm: FormGroup;

  constructor(
              public snackBarService: SnackBarService,
              public notificationsService: NotificationsService,
              public apiService:ApiService,
              public userService:UserService,
              public router:Router
  ) {

    this.data = this.userService.getCurrentUser();

    const name = new FormControl(this.data.name, Validators.required);
    const email = new FormControl(this.data.email, [Validators.required, Validators.email]);
    this.myForm = new FormGroup({
      name: name,
      email: email,
    });
    /*Basic validation end*/

  }

  ngOnInit() {
  }

  submit(){

  }

  public confirmAdd(): void {

    this.userService.updateAdmin(this.data).subscribe((data)=>{
      //this.snackBarService.openSnackBar("Update info ", "Successfully");
      this.notificationsService.success("Profile", 'Profile info Updated Successfully', this.options );

    }, (err)=>{
      //this.snackBarService.openSnackBar(err.error.message, "error", 'error');
      //this.pNotifyService.addNotify({title: 'Profile', msg: err.error.message, type:'error', animate: 'fromRight', position1: 'top', position2: 'right', maxStack: 1});
      this.notificationsService.error("Profile", err.error.message, this.options);

      if(err.status && err.status !== undefined && !this.apiService.isRequestAuthorized(err.status)){
        setTimeout(()=>{
          this.userService.purgeAuth();
          this.router.navigateByUrl('/');
        }, 2000);
      }

    });
  }


}
