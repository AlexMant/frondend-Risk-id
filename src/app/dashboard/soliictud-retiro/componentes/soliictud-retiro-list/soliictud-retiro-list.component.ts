import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { SoliictudretiroService } from 'src/app/core/services/soliictud-retiro.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { SoliictudRetiroVerComponent } from '../soliictud-retiro-ver/soliictud-retiro-ver.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
@Component({
  selector: 'app-soliictud-retiro-list',
  templateUrl: './soliictud-retiro-list.component.html',
  styleUrls: ['./soliictud-retiro-list.component.css'],
})
export class SoliictudretiroListComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private readonly fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private soliictudretiroService: SoliictudretiroService
    , private readonly empresaService: EmpresaService
    ,private _bottomSheet: MatBottomSheet
  ) { }

  get vmP() {
    return this._vmP;
  }

  tableHeadMaintainer: Array<TableHeadInterface> = [
    { name: 'idsolicitudretiro', label: '#' },
    { name: 'vcodigosolicitud', label: 'Código Solicitud', wrap: 0,  event: 'det', },
    { name: 'usuarioSolicitud', label: 'Usuario Sollicitud', wrap: 1 },
    { name: 'usuarioSolicia', label: 'Solicitante' },
   
    
    { name: 'desdireccion', label: 'Dirección Retiro' },
    { name: 'dfecha', label: 'Fecha de Solicitud', type: 'date', format: 'DD/MM/YYYY' },
    { name: 'vobservacion_retiro', label: 'Observación' },
    { name: 'dfechaRetiro_string', label: 'Fecha de Retiro' },
    // { name: 'vobservacion_retirado', label: 'Observación de Retiro' },
  
   
    { name: 'estadojson', label: 'Estado', type: 'jsoncolor', colsNames: ['color', 'descolumn'], wrap: 1 },
 
  ];

  tableDataMaintainer: Array<any>;
  mantenedorForm!: FormGroup;
  check_tipo = JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0;
  modeloRetiro: any = {

    idempresa: null,
    iestadoretiro: null,

  }

  ngOnInit(): void {
  
    this.mantenedorForm = this.fb.group({
      idempresa: [this.modeloRetiro.idempresa],
      iestadoretiro: [this.modeloRetiro.iestadoretiro],


    });
    this.getdataEmpresa();
    this.getData();
  }



  actionsMaintainer: Array<ActionInterface> = [
    {
      icon: 'send',
      label: 'Retirado',
      event: 'edit',
      tooltip: '',
      condition: true,
      contains: 'SI',
      data: 'puededitar',
    },

    // {
    //   icon: 'delete',
    //   label: 'Eliminar',
    //   event: 'delete',
    //   tooltip: '',
    // },
  ];

  outputAction(e?: any) {
    //if (e.event) console.log(e);
    const elementoIndex = this.tableDataMaintainer.filter((element, index) => {
      return index === e.index;
    })[0];

    this.vmP.id = elementoIndex.idsolicitudretiro;




    switch (e.event) {
      case 'det':
       this.detallesolicitud(elementoIndex);

        break;
      case 'edit':
        this.dialog
          .open(ConfirmModalComponent, {
            autoFocus: false,
            panelClass: 'custom-dialog-container',
            width: '320px',
            data: {
              type: 'warning',
              title: 'Recepción de Retiro',
              message: '¿Seguro que desea registrar el retiro?',
              btnText: 'Continuar',
              btnTextSecondary: 'Cancelar',
            },
          })
          .afterClosed()
          .subscribe((res) => {
            if (res) {
              this.soliictudretiroService.cambiaestado(this.vmP.id).subscribe(
                (data) => {
                  this.snackbar.notify(
                    'success',
                    'Registro actualizado exitosamente'
                  );
                  this.getData();
                },
                (err) => {
                  console.log(err);
                  this.snackbar.notify(
                    'danger',
                    'Error al intentar actualizar el registro.'
                  );
                }
              );
            }
          });

        break;
      default:
        break;
    }
  }

  getData() {

    let idempresa = 0;
    if (this.check_tipo == 1) {
      idempresa = this.mantenedorForm.get('idempresa')?.value??0;

    } else {
      idempresa = JSON.parse(localStorage.getItem("userInfo")).idempresa;
    }

    let bodyretiro = {
      idempresa: idempresa,
      idestado: this.mantenedorForm.get('iestadoretiro')?.value??0,
    };

console.log(bodyretiro)
    this.soliictudretiroService.getconsultaretiros(bodyretiro).subscribe(
      (data) => {
        console.log(data);
        this.tableDataMaintainer = data.map((element) => {
          return {
            ...element,
            puededitar: element.iestadoretiro==2 ?'SI' : this.check_tipo == 1 ? 'NO' : 'SI'  ,
            usuarioSolicia: element.nombreUsuSolicita +' '+ element.primerapellidoSolicita,
            usuarioSolicitud: element.nombreUsuGenera +' '+ element.primerapellidoGenera,
            estadojson: JSON.stringify([{ color: this.colorEstado(element.iestadoretiro), descolumn: this.desestadoRetiro(element.iestadoretiro) }]),
          };

        });
      },
      (err) => {
        this.tableDataMaintainer = [];
      }
    );
  }

  desestadoRetiro(estado: any): string {
    switch (estado) {
      case 1:
        return 'Solicitado';
      case 2:
        return 'Retirados';

      case 0:
        return 'Sin Estado';
      default:
        return '';
    }
  }
  colorEstado(estado: any): string {
    switch (estado) {
      case 3:
        return 'bg-warning';
      case 1:
        return 'bg-success';
      case 2:
        return 'bg-secondary';

      default:
        return '';
    }
  }




  dataempresas: any[] = [];
  getdataEmpresa() {
    this.empresaService.getall().subscribe(
      (data) => {
        this.dataempresas = data
        this.selectedempresa = this.dataempresas;
      },
      (err) => {
        this.dataempresas = [];
      }
    );
  }


  selectedempresa: any = [];

  search(event: any) {
    // console.log('query',event.target.value)
    let result = this.select(event.target.value)
    this.selectedempresa = result;
  }


  select(query: string): string[] {
    let result: string[] = [];
    for (let a of this.dataempresas) {
      if (a.vdesbodega.toLowerCase().indexOf(query) > -1) {
        result.push(a)
      }
    }
    return result
  }



  detallesolicitud(data:any){
    console.log(data)

    let bottonSheet = this._bottomSheet.open(SoliictudRetiroVerComponent, {

      data: data,
      disableClose: false,
      autoFocus: false,

    });
    bottonSheet.afterDismissed().subscribe(result => {
      console.log('The dialog was closed', result);
      // this.animal = result;
      // this.router.navigateByUrl('');
      if (result == true) {
        // this.getData();
      }
    });

  }
}
