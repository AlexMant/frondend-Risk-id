import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';

@Component({
  selector: 'app-list-hardware-mant-user',
  templateUrl: './list-hardware-mant-user.component.html',
  styleUrls: ['./list-hardware-mant-user.component.css']
})
export class ListHardwareMantUserComponent implements OnInit , OnDestroy {
  @Output() pageEvent: EventEmitter<PageEvent> = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("sortData0") sortData0 = new MatSort();
  get tableData(): Array<any> {
    return this._tableData;
  }

  @Input() set tableData(value: Array<any>) {

    this._tableData = value;
    this.dataSource.data = this._tableData;
  }
  
  componentDestroyed$: Subject<boolean> = new Subject()
  ngOnDestroy(): void {

    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
  filterValues = {};
  public displayedColumns: string[] = ["idhardware","desitems", "vmarca","vmodelo","vserie","vobservacion","accion"];

 

  public dataSource = new MatTableDataSource();
 
  get vmP() {
    return this._vmP;
  }
  constructor(
    private _vmP: VmParametrosService,
  
     
  ) { }

  private _tableData: Array<any> = [];

   ngAfterViewInit(): void {


    this.dataSource.sort = this.sortData0;
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = 'Items por página';
        this.paginator._intl.firstPageLabel = 'Primera página';
        this.paginator._intl.lastPageLabel = 'Última página';
        this.paginator._intl.nextPageLabel = 'Siguiente página';
        this.paginator._intl.previousPageLabel = 'Página anterior';
     
     
  }

  ngOnInit(): void {
    // this.getcargahardwaremantencion();
   
  }

 
  cargaMantencion: boolean = false;
  // getcargahardwaremantencion() {
  //   this.cargaMantencion = true;

  //   this.dataSource.data = this._vmP.detallaherdsolicitud.map((element: any) => {
  //     return {
  //       idhardware: element.idhardware,
  //       desitems: element.desitems,
  //       vmarca: element.vmarca,
  //       vmodelo: element.vmodelo,
  //       vserie: element.vserie,
  //       vobservacion: element.vobservacion,
  //     }
  //     });

    
  // }

  addComentariohardware(event: any,origen:any) {
     console.log("event", event);
   
   
 
  }
  filterTable(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.dataSource.filter = val.trim().toLowerCase();
  }

  changePaginador(e: PageEvent) {
    console.log('changePaginador', e);
   this.pageEvent.emit(e);
 }



 btnGuardarOpcion(value: any[], idhardware: any, chek_opcion: any) {

   
}
eliminarhardware(id: any) {
  console.log("id", id);
  const index = this._vmP.detallaherdsolicitud.findIndex((element: any) => element.idhardware === id);
  this._vmP.detallaherdsolicitud.splice(index, 1);
  const index2 =  this.vmP.detallaherdsolicitud
  this.vmP.detallaherdsolicitud = []
  this.vmP.detallaherdsolicitud.push(...index2)
  console.log("this.detallaherdsolicitud", this._vmP.detallaherdsolicitud);
}
 

}

