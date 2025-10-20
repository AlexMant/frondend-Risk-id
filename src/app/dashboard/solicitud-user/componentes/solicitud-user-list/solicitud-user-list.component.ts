import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { SubMenuSolicitudUserListService } from 'src/app/dashboard/solicitud-user/componentes/solicitud-user-list/sub-menu-solicitud-user-list.service';
import { SolicitudService } from 'src/app/core/services/solicitud.service';
@Component({
  selector: 'app-solicitud-user-list',
  templateUrl: './solicitud-user-list.component.html',
  styleUrls: ['./solicitud-user-list.component.css']
})
export class SolicitudUserListComponent implements OnInit , OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject()
  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private solicitudService: SolicitudService,
    private readonly fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
       private _vmP: VmParametrosService,
 

    
    private readonly subMenuSolicitudUserListService: SubMenuSolicitudUserListService
  ) {

  


  }

  ngOnDestroy(): void {

    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  get vmP() {
    return this._vmP;
  }
  mantenedorFormsolicitud!: FormGroup;




  check_tipo = JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0;
  modeloSolicitudUser: any = {
    idusuario: JSON.parse(localStorage.getItem("userInfo")).idusuario,
    
    tiposolicitud: null,
    estadosolicitud: null,
  }


  tableHeadMaintainer: Array<TableHeadInterface> = this.subMenuSolicitudUserListService.dataColumnSolicituduser(JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0);

  actionsMaintainer: Array<ActionInterface> = this.subMenuSolicitudUserListService.datasubMenuSolicituduser(JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0);

  tableDataMaintainer: Array<any>;
  ngOnInit(): void {
    
    
    
    this.mantenedorFormsolicitud = this.fb.group({
     
      tiposolicitud: [this.modeloSolicitudUser.tiposolicitud],
      estadosolicitud: [this.modeloSolicitudUser.estadosolicitud],

    });

    this.getData();
  }



  outputAction(e?: any) {
    //if (e.event) console.log(e);
    const elementoIndex = this.tableDataMaintainer.filter((element, index) => {
      return index === e.index;
    })[0];
console.log('elementoIndex',elementoIndex)
    this.vmP.id = elementoIndex.idsolicictud;
    this.vmP.idfk2 = elementoIndex.idsolicictud;
    this.vmP.idfk3 = elementoIndex.ctiposolictud;

    this.vmP.des5 = elementoIndex.vobservacionit;
    if(elementoIndex.idestado == 3){
      this.vmP.solicitudEditable=false;
    }else{
      this.vmP.solicitudEditable=true;
    }


    switch (e.event) {
      case 'edit':
        this.router.navigate(['../edit'], {
          relativeTo: this.activatedRoute,
        });

        break;
      

      
      default:
        break;
    }
  }
 

  getData() {

    let body = {
      idusuario: parseInt(JSON.parse(localStorage.getItem("userInfo")).idusuario),
      idempresa: parseInt(JSON.parse(localStorage.getItem("userInfo")).idempresa??'0'),
      tiposolicitud: this.mantenedorFormsolicitud.get('tiposolicitud')?.value??'0',
      idestado: this.mantenedorFormsolicitud.get('estadosolicitud')?.value??0,
    }


      console.log('consulta',body)

    this.solicitudService.getconsultasolicitud(body).subscribe(
      (data) => {
        console.log("getconsultasolicitud",data)
        this.tableDataMaintainer =  data.map((element) => {
          return {
            ...element,
          
          
            estadojson: JSON.stringify([{ color: this.colorEstado(element.idestado), descolumn: this.desestadoHardware(element.idestado) }]),
            nombreUsuarioGenerador: element.nombregenerador + ' ' + element.apellidogenerador,
            desiposolictud: this.destipo(element.ctiposolictud),
            
          };
        }
        );  
      },
      (err) => {
        this.tableDataMaintainer = [];
      }
    );
  }
  destipo(tipo: any): string {
    switch (tipo) {
      case 'M':
        return 'Mantención';
      case 'N':
        return 'Nuevo Hardware';
      case 'C':
        return 'Cotizacion';
      case '':
        return 'Sin Información';
      default:
        return '';
    }
  }
  desestadoHardware(estado: any): string {
    switch (estado) {
      case 1:
        return 'Abierta';
      case 2:
        return 'En Proceso';
      case 3:
        return 'Cerrada';
      case 0:
        return 'Sin Estado';
      default:
        return '';
    }
  }
  colorEstado(estado: any): string {
    switch (estado) {
      case 3:
        return 'bg-secondary';
      case 1:
        return 'bg-success';
      case 2:
        return 'bg-warning';
    
      default:
        return '';
    }
  }
 

  add() {
  console.log(this.mantenedorFormsolicitud.value)

    this.router.navigate(['../add'], {
      relativeTo: this.activatedRoute
    });

  }
   
}
