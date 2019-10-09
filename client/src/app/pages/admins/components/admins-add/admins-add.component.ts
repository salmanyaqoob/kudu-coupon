
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import {ApiService, AdminsService, SnackBarService, UserService} from '../../../../services/index';
import {Admins} from '../../../../models/admins.model';

import {NotificationsService} from 'angular2-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admins-add',
  templateUrl: './admins-add.component.html',
  styleUrls: ['./admins-add.component.css']
})
export class AdminsAddComponent {
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

  constructor(public dialogRef: MatDialogRef<AdminsAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Admins,
              public dataService: AdminsService,
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
      'role': ['', Validators.compose([ Validators.required])],
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
      this.dataService.addAdmin(this.data).then((data)=>{
        this.dialogRef.close(1);
      }, (err)=>{

        this.notificationsService.error("Admins", err.error.message, this.options);
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

