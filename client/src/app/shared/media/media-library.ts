import { Subscription } from 'rxjs';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { Component,  ElementRef, Input } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { ApiService, MediaService, SnackBarService, JwtService} from '../../services/index';
import { environment } from '../../../environments/environment';

//import the native angular http and respone libraries
//import { Http, Response } from '@angular/http';
import {HttpClient, HttpResponse, HttpErrorResponse} from '@angular/common/http';
//import the do function to be used with the http library.
import "rxjs/add/operator/do";
//import the map function to be used with the http library
import "rxjs/add/operator/map";

@Component({
  selector: 'media-library',
  templateUrl: './media-library.html',
  styleUrls: ['media-library.css']
})
export class MediaLibraryModal {
  public options:FileUploaderOptions;
  public uploader = new FileUploader({
    url: environment.api_url+'/media',
    authToken: `${this.jwtService.getToken()}`,
    isHTML5: true,
    filters: [],
    removeAfterUpload: false,
    disableMultipart: false,
    itemAlias: 'photo',
    headers: [
      //{name: 'Content-Type', value : 'application/json'},
      //{name: 'Accept', value : 'application/json'},
      {name: 'Access-Control-Allow-Origin', value : environment.origin_url},
      {name: 'Access-Control-Expose-Headers', value : 'application/json'},
      {name: 'Authorization', value : `Token ${this.jwtService.getToken()}`},
      {name: 'x-auth', value : `${this.jwtService.getToken()}`},
    ]
  });
  public hasBaseDropZoneOver: boolean = false;
  site_url = environment.site_url;
  image: string;
  media: any;
  busy: Subscription;
  loading: boolean = false;
  constructor(public dialogRef: MatDialogRef<MediaLibraryModal>,
              private mediaService: MediaService,
              public snackBarService: SnackBarService,
              public apiService:ApiService,
              private jwtService: JwtService,
              private snack: MatSnackBar,
              private http: HttpClient, private el: ElementRef
  ) {


    //this.uploader = new FileUploader({ withCredentials: false});
    //this.uploader.setOptions(this.options);
    this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      this.getData('-createdAt');
    };
  }
  ngAfterViewInit() {
    this.uploader.onAfterAddingFile = (item => {
      item.withCredentials = false;
    });
  }
  ngOnInit() {
    this.getData('-createdAt');
  }
  getData(sort?: string) {
    let params = new URLSearchParams();
    this.loading = true;
    params.set('sort', sort);
    //this.busy = this.crud.get('media', params, true)
      //.subscribe(data => { this.media = data; this.loading = false; }, error => { this.snack.open(<any>error, 'OK', { duration: 2000 }); this.loading = false; });

    this.busy = this.mediaService.getAllMedia().subscribe((data)=>{
      this.media = data; this.loading = false;
    }, (err)=>{
      this.snackBarService.openSnackBar(err.error.message, "error", 'error');
    });


  }
  ok(item) {
    this.dialogRef.close(item);
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }


  //the function which handles the file upload without using a plugin.
  upload() {

    //locate the file element meant for the file upload.
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    //get the total amount of files attached to the file input.
    let fileCount: number = inputEl.files.length;
    //create a new fromdata instance
    let formData = new FormData();
    //check if the filecount is greater than zero, to be sure a file was selected.
    if (fileCount > 0) { // a file was selected
      //append the key name 'photo' with the first file in the element
      formData.append('photo', inputEl.files.item(0));

      //call the angular http method
      this.http
        //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
        .post( environment.api_url+'/media', formData).map((res:any) => res.json()).subscribe(
        //map the success function and alert the response
        (success) => {
          alert(success);
        },
        (error) => alert(error))
    }
  }

}
