import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
import { AsignacionesHardwareService } from 'src/app/core/services/asignaciones-hardware.service';
import { EnvioMailService } from 'src/app/core/services/envio-mail.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-asignar-usuario',
  templateUrl: './asignar-usuario.component.html',
  styleUrls: ['./asignar-usuario.component.css']
})
export class AsignarUsuarioComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject()
  constructor(
    private _vmP: VmParametrosService,
    private UsuariosService: UsuariosService,
    private readonly fb: FormBuilder,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private envioMailService: EnvioMailService,
    private asignacionesHardwareService: AsignacionesHardwareService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
    , private _bottomSheetRef: MatBottomSheetRef
  ) { }

  ngOnDestroy(): void {

    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  mantenedorForm!: FormGroup;
  modeloguardar: any;
  modeloAddAsignar: any = {
    idusuario: null,
    idhardware: null,
    idresponsable: JSON.parse(localStorage.getItem("userInfo")).idusuario,
    cestado: 'A',
    idasiganacionhardware: null
  };
  ngOnInit(): void {

    this.modeloguardar = this.data;
    this.modeloAddAsignar.idhardware = this.modeloguardar.idhardware;
    this.modeloAddAsignar.idasiganacionhardware = this.modeloguardar.idasiganacionhardware;
    console.log("this.data", this.modeloguardar)
    this.mantenedorForm = this.fb.group({

      vmail: [null, [Validators.required]],

    });
  }



  onCloseClick(): void {
    this._bottomSheetRef.dismiss();
  }
  preloader: boolean = false;
  guardar() {

    this.preloader = true;

    let modeloAsignaion = {
      idusuario: this.modeloAddAsignar.idusuario,
      idhardware: this.modeloAddAsignar.idhardware,
      idresponsable: this.modeloAddAsignar.idresponsable,
      cestado:"A",
      idasignacion: this.modeloAddAsignar.idasiganacionhardware
    };
    this.asignacionesHardwareService.insasignacion( modeloAsignaion).subscribe(
      (data) => {
        this.snackbar.notify('success', 'se ha asignado correctamente .');
       this.envioMail(data[0]);
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

  getDataUsuarios(mail: any) {
    console.log("mail", mail)
    this.UsuariosService.getbymail(mail).subscribe(
      (data) => {
        console.log("mail", data)
        if (data.length > 0) {

          if (data[0].estado == 'N') {
            this.mantenedorForm.controls['vmail'].setErrors({ 'incorrect': true });
            this.mantenedorForm.controls['vmail'].markAsTouched();
            this.erromail = 'El usuario esta inactivo.';
            return;
          } else {
            this.modeloAddAsignar.idusuario = data[0].idusuario
            this.erromail = '';
          
          }
        } else {

          this.modeloAddAsignar.idusuario = null;
          this.mantenedorForm.controls['vmail'].setErrors({ 'incorrect': true });
          this.mantenedorForm.controls['vmail'].markAsTouched();
          this.erromail = 'El e-mail no esta registrado.';
        }

      },
      (err) => {

      }
    );
  }
  erromail: any = '';
  validarmail() {
    let email = this.mantenedorForm.get('vmail')?.value;
    if (email != null) {
      if (email.length > 0) {
        if (!this.validateEmail(email)) {
          this.mantenedorForm.controls['vmail'].setErrors({ 'incorrect': true });
          this.mantenedorForm.controls['vmail'].markAsTouched();
          this.erromail = 'El e-mail no es valido.';

        } else {
          this.getDataUsuarios(email);
        }
      }
    } else {
      this.mantenedorForm.controls['vmail'].setErrors({ 'incorrect': true });
      this.erromail = 'El email no es valido.';
    }
  }

  validateEmail(email: any) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  envioMail(usuario: any) {

    

    let modeloMail = {
      titulo: "Asignación de Hardware",
      subtitulo: "Se le ha asignado un dispositivo a su cargo",
      textouno: "" + usuario.nombreUsuario + ", se le ha asignado un hardware a su cargo, para más información favor ingrese a nuestro sitio web.",
      textodos: "Equipo RISK-ID. ",
      linkboton: "",
      Asunto: "Asignación de Hardware",
      nombre: usuario.nombreUsuario + ' ' + usuario.primerApellido,
      email: usuario.mail,


    };
    this.envioMailService.mailform(modeloMail).pipe(takeUntil(this.componentDestroyed$)).pipe(takeUntil(this.componentDestroyed$)).subscribe();
    this.preloader = false;
    this._bottomSheetRef.dismiss(true);
  }
}
