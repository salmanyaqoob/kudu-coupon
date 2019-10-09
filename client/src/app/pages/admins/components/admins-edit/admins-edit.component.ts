
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import {ApiService, AdminsService, SnackBarService, UserService} from '../../../../services/index';
import {NotificationsService} from 'angular2-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admins-edit',
  templateUrl: './admins-edit.component.html',
  styleUrls: ['./admins-edit.component.css']
})
export class AdminsEditComponent {
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

  roles_array = [{index:"SUPER_ADMIN", value:"Super Admin"}, {index:"ADMIN", value:"Admin"}, {index:"MANAGER", value:"Manager"}];

  constructor(public dialogRef: MatDialogRef<AdminsEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: AdminsService,
              private fb: FormBuilder,
              public snackBarService: SnackBarService,
              public notificationsService: NotificationsService,
              public apiService:ApiService,
              public userService:UserService,
              public router:Router
  ) {

    this.myForm = this.fb.group({
      'name': [data.name, Validators.compose([ Validators.required])],
      'email': [{value: data.email, disabled: true}, Validators.compose([ Validators.email, Validators.required])],
      'role': [data.role, Validators.compose([ Validators.required])],
      'is_active': [data.is_active, Validators.compose([ Validators.required])],
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

  stopEdit(): void {

    this.isSubmitting = true;
    if(!this.myForm.valid){
      this.isSubmitting = false;
    } else {

      this.data.name = this.myForm.value.name;
      //this.data.email = this.myForm.value.email;
      this.data.role = this.myForm.value.role;
      this.data.is_active = this.myForm.value.is_active;

      this.dataService.updateAdmin(this.data).then((data)=>{
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
