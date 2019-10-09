

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import {ApiService, PrizesService, SnackBarService, UserService} from '../../../../services/index';
import {Prizes} from '../../../../models/prizes.model';

import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {MediaLibraryModal} from "../../../../shared/media/media-library";

import {NotificationsService} from 'angular2-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prizes-edit',
  templateUrl: './prizes-edit.component.html',
  styleUrls: ['./prizes-edit.component.css']
})
export class PrizesEditComponent {

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

  constructor(public dialogRef: MatDialogRef<PrizesEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: PrizesService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              public snackBarService: SnackBarService,
              public notificationsService: NotificationsService,
              public apiService:ApiService,
              public userService:UserService,
              public router:Router
  ) {

    this.myForm = this.fb.group({
      'title': [this.data.title, Validators.compose([ Validators.required])],
      'prize_image': [this.data.prize_image, Validators.compose([ Validators.required])],
      'prize_type': [this.data.prize_type, Validators.compose([ Validators.required])],
      'total_quantity': [this.data.total_quantity, Validators.compose([ Validators.required])],
      'total_points': [this.data.total_points, Validators.compose([ Validators.required])],
      'region': [this.data.region, Validators.compose([ Validators.required])],
      'limit_per_day': [this.data.limit_per_day, Validators.compose([ Validators.required])],
      'prize_value': [this.data.prize_value, Validators.compose([ Validators.required])],
      'prize_status': [this.data.prize_status, Validators.compose([ Validators.required])],
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

  chooseImage() {
    const dialogRef = this.dialog.open(MediaLibraryModal, {
      width: '80%',
      height: '80%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.myForm.value.prize_image = result;
        this.data.prize_image = result;
        //this.variantsForm.get('image').setValue(result);
      }
    });
  }

  stopEdit(): void {

    this.isSubmitting = true;
    if(!this.myForm.valid){
      this.isSubmitting = false;
    } else {

      this.data.title = this.myForm.value.title;
      this.data.prize_image = this.myForm.value.prize_image;
      this.data.prize_type = this.myForm.value.prize_type;
      this.data.total_quantity = this.myForm.value.total_quantity;
      this.data.total_points = this.myForm.value.total_points;
      this.data.region = this.myForm.value.region;
      this.data.limit_per_day = this.myForm.value.limit_per_day;
      this.data.prize_value = this.myForm.value.prize_value;
      this.data.prize_status = this.myForm.value.prize_status;

      this.dataService.updatePrize(this.data).then((data)=>{
        this.dialogRef.close(1);
      }, (err)=>{
        this.notificationsService.error("Prizes", err.error.message, this.options );
        // /this.snackBarService.openSnackBar(err.error.message, "error", 'error');

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
