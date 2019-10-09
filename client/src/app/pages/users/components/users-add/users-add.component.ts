

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import {ApiService, UsersService, SnackBarService, UserService} from '../../../../services/index';
import {Users} from '../../../../models/users.model';

import {NotificationsService} from 'angular2-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css']
})
export class UsersAddComponent {

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
  isSubmitting = false;
  myForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<UsersAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Users,
              public dataService: UsersService,
              private fb: FormBuilder,
              public snackBarService: SnackBarService,
              public notificationsService: NotificationsService,
              public apiService:ApiService,
              public userService:UserService,
              public router:Router

  ) {

    this.myForm = this.fb.group({
      'name': ['', Validators.compose([ Validators.required])],
      'email': ['', Validators.compose([ Validators.email, Validators.required])],
      'password': ['', Validators.compose([ Validators.minLength(8), Validators.required])],
      'mobileNumber': ['', Validators.compose([ Validators.required])],
      'is_active': ['', Validators.compose([ Validators.required])],
    });

  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {

    this.isSubmitting = true;
    if(!this.myForm.valid){
      this.isSubmitting = false;
    } else {
      this.dataService.addUser(this.data).then((data)=>{
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

}





//
//
//
//import { Component, OnInit } from '@angular/core';
//import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
//
//
//@Component({
//  selector: 'app-users-add',
//  templateUrl: './users-add.component.html',
//  styleUrls: ['./users-add.component.css']
//})
//export class UsersAddComponent implements OnInit {
//  usersForm: FormGroup;
//  submitAttempt: boolean = false;
//
//  name:string = '';
//  mobile_no:string='';
//  email:string='';
//  password:string="";
//  constructor(private fb: FormBuilder) {
//    this.usersForm = this.fb.group({
//      nameForm: [this.name, Validators.compose([Validators.maxLength(30), Validators.required])],
//      mobileForm: [this.mobile_no, Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]*')])],
//      emailForm: [this.email, Validators.compose([ Validators.email, Validators.required])],
//      passwordForm: [this.password, Validators.compose([ Validators.minLength(8), Validators.required])],
//    });
//  }
//  ngOnInit() {
//  }
//  submitUsersForm(){
//    this.submitAttempt = true;
//    if(!this.usersForm.valid){
//    } else {
//    }
//  }
//}


