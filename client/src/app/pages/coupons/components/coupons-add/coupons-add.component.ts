
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import {ApiService, CouponsService, SnackBarService, UserService} from '../../../../services/index';
import {Coupons} from '../../../../models/coupons.model';

import {NgbCalendar, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "../../../../services/ngb-date-fr-parser-formatter";

import {NotificationsService} from 'angular2-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coupons-add',
  templateUrl: './coupons-add.component.html',
  styleUrls: ['./coupons-add.component.css'],
  providers: [{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})
export class CouponsAddComponent {
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

  constructor(public dialogRef: MatDialogRef<CouponsAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Coupons,
              public dataService: CouponsService,
              private fb: FormBuilder,
              public snackBarService: SnackBarService,
              public notificationsService: NotificationsService,
              public apiService:ApiService,
              public userService:UserService,
              public router:Router,
              public parserFormatter: NgbDateParserFormatter
  ) {

    this.myForm = this.fb.group({
      'title': ['', Validators.compose([ Validators.required])],
      'start_date': ['', Validators.compose([ Validators.required])],
      'end_date': ['', Validators.compose([ Validators.required])],
      'coupon_type': ['', Validators.compose([ Validators.required])],
      'total_coupon_limit': ['', Validators.compose([ Validators.required])],
      'region': ['', Validators.compose([ Validators.required])],
      'coupon_status': ['active', Validators.compose([ Validators.required])],
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
      //this.data.start_date = this.data.start_date.month+"/"+this.data.start_date.day+"/"+this.data.start_date.year;
      //this.data.end_date = this.data.end_date.month+"/"+this.data.end_date.day+"/"+this.data.end_date.year;
      this.data.start_date = this.parserFormatter.format(this.myForm.value.start_date);
      this.data.end_date = this.parserFormatter.format(this.myForm.value.end_date);
      this.data.total_coupon_consumed = "0";
      this.dataService.addCoupon(this.data).then((data)=>{
        this.dialogRef.close(1);
      }, (err)=>{
        this.notificationsService.error("Coupons", err.error.message, this.options );
        if(err.status && err.status !== undefined && !this.apiService.isRequestAuthorized(err.status)){

          setTimeout(()=>{
            this.userService.purgeAuth();
            this.router.navigateByUrl('/');
            this.dialogRef.close(0);
          }, 2000);
        }
        // /this.snackBarService.openSnackBar(err.error.message, "error", 'error');
      });
    }
  }
}
