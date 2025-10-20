import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionInterface } from 'src/app/core/interfaces/action.model';
import { TableHeadInterface } from 'src/app/core/interfaces/tableHead.model';
import { DocumentossolicitudService } from 'src/app/core/services/documentos-solicitud.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';
import { SubMenuDocumentoSolicitudListService } from './sub-menu-documento-solicitud-list.service';
@Component({
  selector: 'app-documentos-solicitud-list',
  templateUrl: './documentos-solicitud-list.component.html',
  styleUrls: ['./documentos-solicitud-list.component.css'],
})
export class DocumentossolicitudListComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _vmP: VmParametrosService,
    private documentossolicitudService: DocumentossolicitudService
    ,private subMenuDocumentoSolicitudListService: SubMenuDocumentoSolicitudListService
  ) { }

  get vmP() {
    return this._vmP;
  }

  modeloarchivos: any = {
    idsolicictud: this.vmP.idfk2,
    basedoc: null,
    vobservaciondoc: null,
    nombre_archivo: null,
  };

  
  ngOnInit(): void {
    this.vmP.documentosSolicitud = [];
    this.getData();
  }

 
  tableHeadMaintainer: Array<TableHeadInterface> = this.subMenuDocumentoSolicitudListService.dataColumnDocSolicitud(this.vmP.solicitudEditable);

  actionsMaintainer: Array<ActionInterface> = this.subMenuDocumentoSolicitudListService.datasubMenuDocSolicitud(this.vmP.solicitudEditable);

  tableDataMaintainer: Array<any>;

  outputAction(e?: any) {
    //if (e.event) console.log(e);
    const elementoIndex = this.tableDataMaintainer.filter((element, index) => {
      return index === e.index;
    })[0];

    this.vmP.id6 = elementoIndex.iddocsolicitud;




    switch (e.event) {
      case 'edit':
        this.router.navigate(['edit'], {
          relativeTo: this.activatedRoute,
        });

        break;
        case 'desc':
          this.downloadAsPDF( elementoIndex.vdocumento,elementoIndex.nombre_doc,);
        break;
      case 'delete':
        this.dialog
          .open(ConfirmModalComponent, {
            autoFocus: false,
            width: '320px',
            data: {
              type: 'warning',
              title: '¡Advertencia!',
              message: '¿Seguro que desea eliminar el registro?',
              btnText: 'Continuar',
              btnTextSecondary: 'Cancelar',
            },
          })
          .afterClosed()
          .subscribe((res) => {
            if (res) {
              this.documentossolicitudService.delete(this.vmP.id6).subscribe(
                (data) => {
                  this.snackbar.notify(
                    'success',
                    'Registro eliminado exitosamente'
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
    this.documentossolicitudService.getdocbyempresa(this.vmP.idfk2).subscribe(
      (data) => {
        this.vmP.documentosSolicitud = data;
        this.tableDataMaintainer = data.map((element) => {
          return {
            ...element,
            del: this.vmP.solicitudEditable==true?'SI':'NO'
          }
        });
      },
      (err) => {
        this.tableDataMaintainer = [];
      }
    );
  }

  preloader: boolean = false;
  guardar() {

    console.log('modelo', this.modeloarchivos);
    this.preloader = true;
    this.documentossolicitudService.post(this.modeloarchivos).subscribe(
      (data) => {
        this.snackbar.notify('success', 'Registro agregado exitosamente');
        this.preloader = false;
        this.getData();
      },
      (err) => {
        console.log(err);
        this.preloader = false;
        this.snackbar.notify(
          'danger',
          'Error al intentar agregar el registro.'
        );
      }
    );

  }

   

  downloadAsPDF(base64String:string, nombreArchivo: string) {

   
  
    if (base64String.startsWith("JVB")) {
      base64String = "data:application/pdf;base64," + base64String;
      this.downloadFileObject(base64String,nombreArchivo);
    } else if (base64String.startsWith("data:application/pdf;base64")) {
      this.downloadFileObject(base64String,nombreArchivo);
    } else {
      alert("No es una cadena PDF Base64 válida. por favor, compruebe");
    }
  
  }
  
  downloadFileObject(base64String,nombreArchivo: string) {
    const linkSource = base64String;
    const downloadLink = document.createElement("a");
    const fileName = nombreArchivo;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

}
