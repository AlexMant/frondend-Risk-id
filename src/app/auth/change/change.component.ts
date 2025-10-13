import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Fx } from 'src/app/utils/functions';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ChangeModel } from '../../core/interfaces/login.model';
import { UsuariosService } from 'src/app/core/services/usuarios.service';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css']
})
export class ChangeComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject()
  ngOnDestroy(): void {

    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
  invalidDatos: boolean = false;
  invalidDatos1: boolean = false;
  credentials: ChangeModel = { vpassword: '', vpassword_tmp: '' };
  preloader: boolean = false;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private usuariosService: UsuariosService,
    private snackbar: NotificationService,
    public dialogRef: MatDialogRef<ChangeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }
  change = (form: NgForm) => {


    if (this.credentials.vpassword != this.credentials.vpassword_tmp) {
      this.snackbar.notify('danger', 'Las Contraseñas son distintas');
      this.invalidDatos1 = true,
        this.preloader = false
    } else {

      let cambiopas: ChangeModel = Object.assign({}, this.credentials);
      cambiopas.vpassword = Fx.encrypPass(cambiopas.vpassword);
      this.preloader = true;

      if (form.valid) {

        this.usuariosService.updateclave(cambiopas).pipe(takeUntil(this.componentDestroyed$)).pipe(takeUntil(this.componentDestroyed$)).subscribe(
          (data) => {
              console.log(">>>>>>data",data),
            this.invalidDatos = false;

            this.dialogRef.close(true);
            this.snackbar.notify('success', 'Contraseña Actualizada');
            // this.router.navigate(["./auth/login"]);

          },
          (err) => {
            // console.log(">>>>>>err",err),
            this.invalidDatos = true,
              this.preloader = false

          }
        );
      }


    }



  };

  closeDialog(): void {
    this.dialogRef.close(false);
  }


}
