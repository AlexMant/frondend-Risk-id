import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeligrosService } from 'src/app/core/services/peligros.service';
import { NotificationService } from 'src/app/core/services/notification.service';

import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
@Component({
  selector: 'app-peligros-edit',
  templateUrl: './peligros-edit.component.html',
  styleUrls: ['./peligros-edit.component.css'],
})
export class PeligrosEditComponent implements OnInit {
  constructor(
    private _vmP: VmParametrosService,
    private PeligrosService: PeligrosService,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  modelo: any;
  get vmP() {
    return this._vmP;
  }

  ngOnInit(): void {
    this.PeligrosService.getid(this.vmP.id).subscribe(
      (data) => {
        console.log(data);
        this.modelo = data.data;
         this.modelo.accion = 'U';
      },
      (err) => {
        this.modelo = {};
      }
    );
  }
  cancelar() {
    this.router.navigate(['./..'], {
      relativeTo: this.activatedRoute,
    });
  }
  guardar() {
    console.log("guardar",this.modelo);
    this.PeligrosService.put(this.vmP.id, this.modelo).subscribe(
      (data) => {
        this.snackbar.notify('success', 'Registro actualizado exitosamente');
        this.router.navigate(['./..'], {
          relativeTo: this.activatedRoute,
        });
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
}
