import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { UbicacionesService } from 'src/app/core/services/ubicaciones.service';
import { RiesgosService } from 'src/app/core/services/riesgos.service';
import { PeligrosAdicionalesService } from 'src/app/core/services/peligros-adicionales.service';

@Component({
  selector: 'app-add-ubicacion-incidente-modal',
  templateUrl: './add-ubicacion-incidente-modal.component.html',
  styleUrls: ['./add-ubicacion-incidente-modal.component.css']
})
export class AddUbicacionIncidenteModalComponent implements OnInit {
  mantenedorForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddUbicacionIncidenteModalComponent>,
    private readonly fb: FormBuilder,
    private UsuariosService: UsuariosService,
    private dialog: MatDialog,

    private snackbar: NotificationService,
    private _vmP: VmParametrosService,
    private ubivacionservice: UbicacionesService,
    private riesgoservice: RiesgosService,
    private peligroadicionalservice: PeligrosAdicionalesService

  ) { }

  get vmP() {
    return this._vmP;
  }



  nombremodal: string = '';
  idcentrotrabajo: number = 0;
idempresa: number = 0;
  ngOnInit(): void {
 

   this.idcentrotrabajo = this.data.idcentrotrabajo;
    this.idempresa = this.data.empresaid;


    if (this.data.origen === 'U') {
      this.nombremodal = 'Ubicación';
    } else if (this.data.origen === 'R') {
      this.nombremodal = 'Riesgo';
    } else if (this.data.origen === 'P') {
      this.nombremodal = 'Peligro Adicional';
    } else {
      this.nombremodal = 'Otro';
    }

    this.mantenedorForm = this.fb.group({
      nombre: [null, [Validators.required]],
    });
  }


  modelo: any = {
    id: 0,
    nombre: null,

  };



  agregar() {


    this.modelo.nombre = this.mantenedorForm.get('nombre')?.value;


    this.dialog
      .open(ConfirmModalComponent, {
        autoFocus: false,
        width: '320px',
        data: {
          type: 'warning',
          title: '¡Advertencia!',
          message: '¿Seguro que desea agregar la ' + this.nombremodal + '?',
          btnText: 'Continuar',
          btnTextSecondary: 'Cancelar',
        },
      })
      .afterClosed()
      .subscribe((res) => {

        if (res) {


          if (this.data.origen === 'U') {
            this.guardarubicacion(this.modelo);
          } else if (this.data.origen === 'R') {
            this.guardarriesgo(this.modelo);
          } else if (this.data.origen === 'P') {
            this.guardarpeligroadicional(this.modelo);
          }



        }
      }
      );
  }



  closeAction() {
    this.dialogRef.close('');
  }


  guardarubicacion(modelo: any) {


    let ubicacionmodelo = {
      nombre: modelo.nombre,
      centroTrabajoId: this.idcentrotrabajo
    };
   

    this.ubivacionservice.post(ubicacionmodelo).subscribe(
      (data) => {
        this.snackbar.notify('success', 'Registro agregado exitosamente');
        this.dialogRef.close('ubicacion');
      },
      (err) => {
        console.log(err);
        this.snackbar.notify(
          'danger',
          'Error al intentar agregar el registro.'
        );
      }
    );
  }

  guardarriesgo(modelo: any) {

    this.riesgoservice.post(modelo).subscribe(
      (data) => {
        this.snackbar.notify('success', 'Registro agregado exitosamente');
        this.dialogRef.close('riesgo');
      },
      (err) => {
        console.log(err);
        this.snackbar.notify(
          'danger',
          'Error al intentar agregar el registro.'
        );
      }
    );

  }

  guardarpeligroadicional(modelo: any) {

    this.peligroadicionalservice.post(modelo).subscribe(
      (data) => {
        this.snackbar.notify('success', 'Registro agregado exitosamente');
        this.dialogRef.close('peligroadicional');
      },
      (err) => {
        console.log(err);
        this.snackbar.notify(
          'danger',
          'Error al intentar agregar el registro.'
        );
      }
    );

  }


}
