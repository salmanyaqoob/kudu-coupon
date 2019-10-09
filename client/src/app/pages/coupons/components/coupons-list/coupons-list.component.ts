import { Router} from '@angular/router';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DataSource} from '@angular/cdk/collections';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {CouponsAddComponent} from "../coupons-add/coupons-add.component";
import {CouponsEditComponent} from "../coupons-edit/coupons-edit.component";
import {CouponsDeleteComponent} from "../coupons-delete/coupons-delete.component";

import { CouponsQrListComponent } from '../../components/qr/coupons-qr-list/coupons-qr-list.component';
import { CouponsQrAddComponent } from '../../components/qr/coupons-qr-add/coupons-qr-add.component';

import {ApiService, CouponsService, SnackBarService} from '../../../../services/index';
import {HttpClient} from '@angular/common/http';
import {Coupons} from '../../../../models/coupons.model';

import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-coupons-list',
  templateUrl: './coupons-list.component.html',
  styleUrls: ['./coupons-list.component.css']
})
export class CouponsListComponent implements OnInit {

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

  displayedColumns = ['_id', 'title', 'start_date', 'end_date', 'coupon_type', 'total_coupon_limit', 'total_coupon_consumed', 'region', 'coupon_status', 'actions'];
  exampleDatabase: CouponsService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id2: string;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: CouponsService,
              public apiService:ApiService,
              public router:Router,
              public snackBarService: SnackBarService,
              public notificationsService: NotificationsService

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

  addNew(coupon: Coupons) {
    const dialogRef = this.dialog.open(CouponsAddComponent, {
      data: {coupon: coupon },
      width: "80%",
      maxWidth: "none"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
        this.notificationsService.success("Coupons", 'Coupon info has been added Successfully', this.options );
        //this.snackBarService.openSnackBar("Coupon info has been added", "Successfully");
      } else {
        this.notificationsService.info("Coupons", "Operation not perform", this.options);
        //this.snackBarService.openSnackBar("Operation not perform", "Error", 'error');
      }
    });
  }

  startEdit(i: number, id: string, title: string, start_date: string, end_date: string, coupon_type: string, total_coupon_limit: string, total_coupon_consumed: string, region: string, createdAt: string, coupon_status: string) {
    this.index = i;
    this.id2 = id;
    console.log(this.index);
    const dialogRef = this.dialog.open(CouponsEditComponent, {
      data: {_id: id, title: title, start_date: start_date, end_date: end_date, coupon_type: coupon_type, total_coupon_limit: total_coupon_limit,
        total_coupon_consumed: total_coupon_consumed, region: region, createdAt: createdAt, coupon_status: coupon_status},
      width: "80%",
      maxWidth: "none"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // Part where we do frontend update, first you need to find record using id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x._id === this.id2);
        // Then you update that record using dialogData
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
        this.notificationsService.success("Coupons", 'Coupon info has been updated Successfully', this.options );
        //this.snackBarService.openSnackBar("Coupon info has been update", "Successfully");
      } else {
        this.notificationsService.info("Coupons", "Operation not perform", this.options);
        //this.snackBarService.openSnackBar("Operation not perform", "Error", 'error');
      }
    });
  }

  deleteItem(i: number, id: string, title: string, coupon_type: string, region: string) {
    this.index = i;
    this.id2 = id;
    const dialogRef = this.dialog.open(CouponsDeleteComponent, {
      data: {_id: id, title: title, coupon_type: coupon_type, region: region}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x._id === this.id2);
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
        this.notificationsService.success("Coupons", 'Coupon info has been updated Successfully', this.options );
        //this.snackBarService.openSnackBar("Coupon info has been deleted", "Successfully");
      } else {
        this.notificationsService.info("Coupons", "Operation not perform", this.options);
        //this.snackBarService.openSnackBar("Operation not perform", "Error", 'error');
      }
    });
  }

  listQR(i: number, id: string){

    //this.router.navigate(['coupons/qr/list/']);

    this.index = i;
    this.id2 = id;
    const dialogRef = this.dialog.open(CouponsQrListComponent, {
      data: {_id: id},
      width: "80%",
      maxWidth: "none"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x._id === this.id2);
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }

  addQR(i: number, id: string, title: string){

    //this.router.navigate(['coupons/qr/list/']);

    this.index = i;
    this.id2 = id;
    const dialogRef = this.dialog.open(CouponsQrAddComponent, {
      data: {_id: id, title:title},
      width: "80%",
      maxWidth: "none"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        //const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x._id === this.id2);
        //this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        //this.refreshTable();

        this.notificationsService.success("Coupon QR", 'Coupon QR info has been Added Successfully', this.options );
        //this.snackBarService.openSnackBar("Coupon QR info has been Added", "Successfully");
      } else {
        this.notificationsService.info("Coupons", "Operation not perform", this.options);
        //this.snackBarService.openSnackBar("Operation not perform", "Error", 'error');
      }
    });
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
    this.exampleDatabase = new CouponsService(this.httpClient, this.apiService);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
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
}


export class ExampleDataSource extends DataSource<Coupons> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Coupons[] = [];
  renderedData: Coupons[] = [];

  constructor(public _exampleDatabase: CouponsService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Coupons[]> {
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
    this._exampleDatabase.getAllCoupons();

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((data: Coupons) => {
        const searchStr = (data.title + data.region + data.coupon_type).toLowerCase();
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
  sortData(data: Coupons[]): Coupons[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case '_id': [propertyA, propertyB] = [a._id, b._id]; break;
        case 'title': [propertyA, propertyB] = [a.title, b.title]; break;
        case 'start_date': [propertyA, propertyB] = [a.start_date, b.start_date]; break;
        case 'end_date': [propertyA, propertyB] = [a.end_date, b.end_date]; break;
        case 'coupon_type': [propertyA, propertyB] = [a.coupon_type, b.coupon_type]; break;
        case 'total_coupon_limit': [propertyA, propertyB] = [a.total_coupon_limit, b.total_coupon_limit]; break;
        case 'total_coupon_consumed': [propertyA, propertyB] = [a.total_coupon_consumed, b.total_coupon_consumed]; break;
        case 'region': [propertyA, propertyB] = [a.region, b.region]; break;
        case 'createdAt': [propertyA, propertyB] = [a.createdAt, b.createdAt]; break;
        case 'coupon_status': [propertyA, propertyB] = [a.coupon_status, b.coupon_status]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
