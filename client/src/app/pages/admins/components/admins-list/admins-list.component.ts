
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

import { AdminsListConfig, Admins } from '../../../../models/index';
import {AdminsAddComponent} from "../admins-add/admins-add.component";
import {AdminsEditComponent} from "../admins-edit/admins-edit.component";

import {ApiService, AdminsService, SnackBarService} from '../../../../services/index';

import {HttpClient} from '@angular/common/http';

import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.css']
})

export class AdminsListComponent implements OnInit {
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
  displayedColumns = ['_id', 'name', 'email', 'role', 'is_active', 'createdAt', 'actions'];
  exampleDatabase: AdminsService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id2: string;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: AdminsService,
              public apiService:ApiService,
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

  addNew(admin: Admins) {
    const dialogRef = this.dialog.open(AdminsAddComponent, {
      data: {admin: admin },
      width: "80%",
      maxWidth: "none"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
        this.notificationsService.success("Admins", 'Admin info has been added Successfully', this.options );
        //this.snackBarService.openSnackBar("Admin info has been added", "Successfully");
      } else {
        this.notificationsService.info("Admins", "Operation not perform", this.options);
        //this.snackBarService.openSnackBar("Operation not perform", "Error", 'error');
      }
    });
  }

  startEdit(i: number, id: string, name: string, email: string, role: string, is_active: string, createdAt: string) {
    this.index = i;
    this.id2 = id;
    console.log(this.index);
    const dialogRef = this.dialog.open(AdminsEditComponent, {
      data: {_id: id, name: name, email: email, role: role, is_active: is_active, createdAt: createdAt},
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
        this.notificationsService.success("Admins", 'Admin info has been update Successfully', this.options );
        //this.snackBarService.openSnackBar("Admin info has been update", "Successfully");
      } else {
        this.notificationsService.info("Admins", "Operation not perform", this.options);
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
    this.exampleDatabase = new AdminsService(this.httpClient, this.apiService);
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


export class ExampleDataSource extends DataSource<Admins> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Admins[] = [];
  renderedData: Admins[] = [];
  adminQuery: AdminsListConfig;

  constructor(public _exampleDatabase: AdminsService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Admins[]> {
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
    this._exampleDatabase.getAllAdmins();

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((admin: Admins) => {
        const searchStr = (admin.name + admin.email + admin.createdAt).toLowerCase();
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
  sortData(data: Admins[]): Admins[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case '_id': [propertyA, propertyB] = [a._id, b._id]; break;
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'email': [propertyA, propertyB] = [a.email, b.email]; break;
        case 'role': [propertyA, propertyB] = [a.role, b.role]; break;
        case 'is_active': [propertyA, propertyB] = [a.is_active, b.is_active]; break;
        case 'createdAt': [propertyA, propertyB] = [a.createdAt, b.createdAt]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
