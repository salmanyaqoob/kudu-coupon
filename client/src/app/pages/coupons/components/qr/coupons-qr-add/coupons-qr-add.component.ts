

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import {ApiService, CouponQRService, SnackBarService} from '../../../../../services/index';
import {CouponQR} from '../../../../../models/coupon-qr.model';

import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-coupons-qr-add',
  templateUrl: './coupons-qr-add.component.html',
  styleUrls: ['./coupons-qr-add.component.css']
})
export class CouponsQrAddComponent {

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

  constructor(public dialogRef: MatDialogRef<CouponsQrAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: CouponQRService,
              private fb: FormBuilder,
              public snackBarService: SnackBarService,
              public notificationsService: NotificationsService

  ) {

    this.myForm = this.fb.group({
      'total_qr': ['', Validators.compose([ Validators.required])],
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
      this.dataService.addCouponQR(this.data._id, this.data.total_qr).then((data)=>{
        this.dialogRef.close(1);
      }, (err)=>{
        this.notificationsService.error("Coupons QR", err.error.message, this.options );
        //this.snackBarService.openSnackBar(err.error.message, "error", 'error');
      });
    }
  }
}
