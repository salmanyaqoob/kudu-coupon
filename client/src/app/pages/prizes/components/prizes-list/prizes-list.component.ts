

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


import {PrizesAddComponent} from "../prizes-add/prizes-add.component";
import {PrizesEditComponent} from "../prizes-edit/prizes-edit.component";
import { PrizesDeleteComponent } from '../prizes-delete/prizes-delete.component';

import {ApiService, PrizesService, SnackBarService} from '../../../../services/index';
import {HttpClient} from '@angular/common/http';
import {Prizes} from '../../../../models/prizes.model';

import { environment } from '../../../../../environments/environment';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-prizes-list',
  templateUrl: './prizes-list.component.html',
  styleUrls: ['./prizes-list.component.css']
})

// title prize_image prize_type total_quantity total_quantity_consumed total_points region limit_per_day prize_value prize_status createdAt

export class PrizesListComponent implements OnInit {

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

  displayedColumns = ['_id', 'title', 'prize_image', 'prize_type', 'total_quantity', 'total_quantity_consumed',
    'total_points', 'region', 'limit_per_day', 'prize_value', 'prize_status', 'createdAt', 'actions'];
  exampleDatabase: PrizesService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id2: string;
  site_url = environment.site_url;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: PrizesService,
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

  addNew(prize: Prizes) {
    const dialogRef = this.dialog.open(PrizesAddComponent, {
      data: {prize: prize },
      width: "80%",
      maxWidth: "none"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
        this.notificationsService.success("Prizes", 'Prize info has been added Successfully', this.options );
        //this.snackBarService.openSnackBar("Prize info has been added", "Successfully");
      } else {
        this.notificationsService.info("Prizes", "Operation not perform", this.options);
        //this.snackBarService.openSnackBar("Operation not perform", "Error", 'error');
      }
    });
  }

  startEdit(i: number, id: string, title: string, prize_image: string, prize_type: string, total_quantity: number, total_quantity_consumed: number,
            total_points: number, region: string, limit_per_day: number, prize_value: string, prize_status: string, createdAt: string) {
    this.index = i;
    this.id2 = id;
    console.log(this.index);
    const dialogRef = this.dialog.open(PrizesEditComponent, {
      data: {_id: id, title: title, prize_image: prize_image, prize_type: prize_type, total_quantity: total_quantity, total_quantity_consumed: total_quantity_consumed,
        total_points: total_points, region: region, limit_per_day: limit_per_day, prize_value: prize_value, prize_status: prize_status, createdAt: createdAt},
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
        this.notificationsService.success("Prizes", 'Prize info has been update Successfully', this.options );
        //this.snackBarService.openSnackBar("Prize info has been update", "Successfully");
      } else {
        this.notificationsService.info("Prizes", "Operation not perform", this.options);
        //this.snackBarService.openSnackBar("Operation not perform", "Error", 'error');
      }
    });
  }

  deleteItem(i: number, id: string, title: string, prize_image: string, prize_value: string, region: string) {
    this.index = i;
    this.id2 = id;
    const dialogRef = this.dialog.open(PrizesDeleteComponent, {
      data: {_id: id, title: title, prize_image: prize_image, prize_value: prize_value, region:region}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x._id === this.id2);
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
        this.notificationsService.success("Prizes", 'Prize info has been deleted Successfully', this.options );
        //this.snackBarService.openSnackBar("Prize info has been deleted", "Successfully");
      } else {
        this.notificationsService.info("Prizes", "Operation not perform", this.options);
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
    this.exampleDatabase = new PrizesService(this.httpClient, this.apiService);
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


export class ExampleDataSource extends DataSource<Prizes> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Prizes[] = [];
  renderedData: Prizes[] = [];

  constructor(public _exampleDatabase: PrizesService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Prizes[]> {
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
    this._exampleDatabase.getAllPrizes();

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((data: Prizes) => {
        const searchStr = (data.title + data.region + data.prize_value).toLowerCase();
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
  sortData(data: Prizes[]): Prizes[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
// title prize_image prize_type total_quantity total_quantity_consumed
// total_points region limit_per_day prize_value prize_status createdAt
      switch (this._sort.active) {
        case '_id': [propertyA, propertyB] = [a._id, b._id]; break;
        case 'title': [propertyA, propertyB] = [a.title, b.title]; break;
        case 'prize_image': [propertyA, propertyB] = [a.prize_image, b.prize_image]; break;
        case 'prize_type': [propertyA, propertyB] = [a.prize_type, b.prize_type]; break;
        case 'total_quantity': [propertyA, propertyB] = [a.total_quantity, b.total_quantity]; break;
        case 'total_quantity_consumed': [propertyA, propertyB] = [a.total_quantity_consumed, b.total_quantity_consumed]; break;
        case 'total_points': [propertyA, propertyB] = [a.total_points, b.total_points]; break;
        case 'region': [propertyA, propertyB] = [a.region, b.region]; break;
        case 'limit_per_day': [propertyA, propertyB] = [a.limit_per_day, b.limit_per_day]; break;
        case 'prize_value': [propertyA, propertyB] = [a.prize_value, b.prize_value]; break;
        case 'prize_status': [propertyA, propertyB] = [a.prize_status, b.prize_status]; break;
        case 'createdAt': [propertyA, propertyB] = [a.createdAt, b.createdAt]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
