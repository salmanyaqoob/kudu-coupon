
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Router} from '@angular/router';
import {Component, ElementRef, OnInit, ViewChild, Inject} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DataSource} from '@angular/cdk/collections';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {CouponQRService} from '../../../../../services/coupon-qr.service';
import {HttpClient} from '@angular/common/http';
import {CouponQR} from '../../../../../models/coupon-qr.model';
import {ApiService} from "../../../../../services/api.service"


@Component({
  selector: 'app-coupons-qr-list',
  templateUrl: './coupons-qr-list.component.html',
  styleUrls: ['./coupons-qr-list.component.css']
})
export class CouponsQrListComponent {
  displayedColumns = ['_id', 'qr_id', 'qrStatus', 'actions'];
  exampleDatabase: CouponQRService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id2: string;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public apiService:ApiService,
              public router:Router,
              public dialogRef: MatDialogRef<CouponsQrListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CouponQR,
              public dataService: CouponQRService
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  private refreshTable() {
    this.dataSource.filter = '';
    this.dataSource.filter = this.filter.nativeElement.value;
    // If there's no data in filter we do update using pagination, next page or previous page
    if (this.dataSource._filterChange.getValue() === '') {
      if (this.dataSource._paginator.pageIndex === 0) {
        this.dataSource._paginator.nextPage();
        this.dataSource._paginator.previousPage();
      } else {
        this.dataSource._paginator.previousPage();
        this.dataSource._paginator.nextPage();
      }
      // If there's something in filter, we reset it to 0 and then put back old value
    } else {
      this.dataSource.filter = '';
      this.dataSource.filter = this.filter.nativeElement.value;
    }
  }

  public loadData() {
    this.exampleDatabase = new CouponQRService(this.httpClient, this.apiService);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, this.data._id);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  public deleteItem(i:number, id:string){
    this.dataService.deleteCouponQR(this.data._id, id);
    this.refresh();

  }

  public downloadQR(i:number, id:string){
   //data:image/png;base64,
    let img_id = document.querySelector('#img_'+id+" img").getAttribute("src");
    let img_parts = img_id.split("data:image/png;base64,");
    //let base64encodedQRImgString = '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';
    let base64encodedQRImgString = img_parts[1];
    var byteCharacters = atob(base64encodedQRImgString);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var blob: Blob;

    try
    {
      blob = new Blob([byteArray], { type: "image/png" });

      if (window.navigator.msSaveOrOpenBlob)  // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
      {
        window.navigator.msSaveBlob(blob, `QR_${id}.png`);
      }
      else
      {
        var a = window.document.createElement("a");
        a.href = window.URL.createObjectURL(blob);
        a.download = `QR_${id}.png`;
        document.body.appendChild(a);
        a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
        document.body.removeChild(a);
      }
    }
    catch (err)
    {
      //Blob not supported for Safari
      window.open('data:image/png;base64,' + base64encodedQRImgString);
    }

  }

}


export class ExampleDataSource extends DataSource<CouponQR> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: CouponQR[] = [];
  renderedData: CouponQR[] = [];

  constructor(public _exampleDatabase: CouponQRService,
              public _paginator: MatPaginator,
              public _sort: MatSort,
              public couponID:any
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<CouponQR[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];


    //this.adminQuery.filters.limit =  30;
    //this.adminQuery.filters.offset =  (30 * (1 ));

    //this._exampleDatabase.query(this.adminQuery);
    this._exampleDatabase.getAllCouponsQR(this.couponID);

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((data: CouponQR) => {
        const searchStr = (data._id + data.qr_id + data.qrStatus).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    });
  }
  disconnect() {
  }

  /** Returns a sorted copy of the database data. */
  sortData(data: CouponQR[]): CouponQR[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case '_id': [propertyA, propertyB] = [a._id, b._id]; break;
        case 'qr_id': [propertyA, propertyB] = [a.qr_id, b.qr_id]; break;
        case 'qrStatus': [propertyA, propertyB] = [a.qrStatus, b.qrStatus]; break;

      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}




