
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import {ApiService, CouponsService, SnackBarService, UserService} from '../../../../services/index';

import {NgbCalendar, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "../../../../services/ngb-date-fr-parser-formatter";

import {NotificationsService} from 'angular2-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coupons-edit',
  templateUrl: './coupons-edit.component.html',
  styleUrls: ['./coupons-edit.component.css'],
  providers: [{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})
export class CouponsEditComponent {
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

  constructor(public dialogRef: MatDialogRef<CouponsEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: CouponsService,
              private fb: FormBuilder,
              public snackBarService: SnackBarService,
              public notificationsService: NotificationsService,
              public apiService:ApiService,
              public userService:UserService,
              public router:Router,
              public parserFormatter: NgbDateParserFormatter
  ) {



    this.data.start_date = this.parserFormatter.parse(this.data.start_date);
    this.data.end_date = this.parserFormatter.parse(this.data.end_date);

    this.myForm = this.fb.group({
      'title': [this.data.title, Validators.compose([ Validators.required])],
      'start_date': [this.data.start_date, Validators.compose([ Validators.required])],
      'end_date': [this.data.end_date, Validators.compose([ Validators.required])],
      'coupon_type': [this.data.coupon_type, Validators.compose([ Validators.required])],
      'total_coupon_limit': [this.data.total_coupon_limit, Validators.compose([ Validators.required])],
      'region': [this.data.region, Validators.compose([ Validators.required])],
      'coupon_status': [this.data.coupon_status, Validators.compose([ Validators.required])],
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
      //let start_date = this.myForm.value.start_date;
      //start_date = new Date(start_date.year, start_date.month-1, start_date.day);
      //this.data.start_date =  start_date;

      this.data.start_date = this.parserFormatter.format(this.myForm.value.start_date);
      this.data.end_date = this.parserFormatter.format(this.myForm.value.end_date);

      this.data.title = this.myForm.value.title;
      this.data.coupon_type = this.myForm.value.coupon_type;
      this.data.total_coupon_limit = this.myForm.value.total_coupon_limit;
      this.data.region = this.myForm.value.region;
      this.data.coupon_status = this.myForm.value.coupon_status;
      console.log(this.data);
      this.dataService.updateCoupon(this.data).then((data)=>{
        this.dialogRef.close(1);
      }, (err)=>{
        this.notificationsService.error("Coupons", err.error.message, this.options );
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
