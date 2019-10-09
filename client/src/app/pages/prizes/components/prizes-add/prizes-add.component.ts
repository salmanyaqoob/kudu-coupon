

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
  selector: 'app-prizes-add',
  templateUrl: './prizes-add.component.html',
  styleUrls: ['./prizes-add.component.css']
})
export class PrizesAddComponent {

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

  constructor(public dialogRef: MatDialogRef<PrizesAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Prizes,
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
      'title': ['', Validators.compose([ Validators.required])],
      'prize_image': ['', Validators.compose([ Validators.required])],
      'prize_type': ['', Validators.compose([ Validators.required])],
      'total_quantity': ['', Validators.compose([ Validators.required])],
      'total_points': ['', Validators.compose([ Validators.required])],
      'region': ['', Validators.compose([ Validators.required])],
      'limit_per_day': ['', Validators.compose([ Validators.required])],
      'prize_value': ['', Validators.compose([ Validators.required])],
      'prize_status': ['active', Validators.compose([ Validators.required])],
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
        this.data.prize_image = result;
        //this.variantsForm.get('image').setValue(result);
      }
    });
  }

  public confirmAdd(): void {

    this.isSubmitting = true;
    if(!this.myForm.valid){
      this.isSubmitting = false;
    } else {

      this.dataService.addPrize(this.data).then((data)=>{
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
