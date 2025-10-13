import { Component, EventEmitter, AfterViewInit, Input, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
// import { MenuService } from '../../core/services/menu.service';
import { Subscription } from 'rxjs';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { MatSort } from '@angular/material/sort';
import { Fx } from 'src/app/utils/functions';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor( ) { }

  private _tableData: Array<any> = [];

  menuOpen: boolean = true;
  subscription: Subscription;


  @Input('border-block') borderBlock: boolean = true;
  @Input() title: string = '';
  @Input('sticky-start') stickyStart: boolean = false;
  @Input('sticky-last') stickyLast: boolean = false;
  @Input() actions: Array<ActionInterface> = [];
  @Input('header-table') headerTable: Array<TableHeadInterface> = [];
  @Input() filter: boolean = true;
  @Input('filter-columns') filterColumns: boolean = true;
  @Output() actionClick: EventEmitter<{ event: string; index: number; obj?: Object }> = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('paginatorDB', { read: true }) paginatorDB: MatPaginator;

  get tableData(): Array<any> {
    return this._tableData;
  }

  @Input() set tableData(value: Array<any>) {

    this._tableData = value;
    this.dataSource.data = this._tableData;
  }

  @ViewChild("sortData0") sortData0 = new MatSort();


  displayedColumns: Array<{ def: string; show: boolean }> = [];
  dataSource = new MatTableDataSource();

  @Input() tipoPaginacion: string = 'normal';
  @Input() totalFilas = 50;
  @Input() pageSizeParam = 10;
  @Input() pageParam = 0;
  @Output() pageEvent: EventEmitter<PageEvent> = new EventEmitter();

  changePaginador(e: PageEvent) {
     console.log('changePaginador', e);
    this.pageEvent.emit(e);
  }

  ngOnInit(): void {

    this.headerTable.map(item => {
      this.displayedColumns.push({ def: item.name, show: true });
    });
  
    this.getDisplayedColumns();

    this.actions.length > 0 && this.displayedColumns.push({ def: 'actions', show: true });
  }

  ngAfterViewInit(): void {


    this.dataSource.sort = this.sortData0;

    if (this.tipoPaginacion == 'db') {
      if (this.paginatorDB != undefined) {
        this.dataSource.paginator = this.paginatorDB;
        this.paginatorDB._intl.itemsPerPageLabel = 'Items por página';
        this.paginatorDB._intl.firstPageLabel = 'Primera página';
        this.paginatorDB._intl.lastPageLabel = 'Última página';
        this.paginatorDB._intl.nextPageLabel = 'Siguiente página';
        this.paginatorDB._intl.previousPageLabel = 'Página anterior';
 
      }
    }
    else {
      if (this.paginator != undefined) {
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = 'Items por página';
        this.paginator._intl.firstPageLabel = 'Primera página';
        this.paginator._intl.lastPageLabel = 'Última página';
        this.paginator._intl.nextPageLabel = 'Siguiente página';
        this.paginator._intl.previousPageLabel = 'Página anterior';
      }
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  filterTable(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.dataSource.filter = val.trim().toLowerCase();
  }

  checkColumn(e: MatCheckboxChange, name: string) {
    const i = this.displayedColumns.findIndex(item => item.def == name);
    this.displayedColumns[i].show = e.checked;
    this.getDisplayedColumns();
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumns.filter(cd => cd.show).map(cd => cd.def);
  }

  getAction(event, element) {
    const i = this.tableData.indexOf(element);
    this.actionClick.emit(
      {
        event: event,
        index: i,
        obj: this.tableData[i]
      }
    );
  }

  showAction(condition: boolean, element: Object, data: string, contains: string): boolean {
    if (condition) {
      return !element[data].includes(contains);
    }
    return true;
  }
 
  onChangeDemo(event, element): boolean  {

    const i = this.tableData.indexOf(element);
    this.tableData[i].chek = event.checked;
    // this.dataSource.data = this._tableData;
    // console.log("onChangeDemo>element.chek", this._tableData, event.checked,i);
       
      return element.chek;
     
  }

 
  getJson(item: any) {
 
    return Fx.getJson(item)
  }

  


}
