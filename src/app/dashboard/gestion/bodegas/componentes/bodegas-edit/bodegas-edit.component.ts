import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BodegasService } from 'src/app/core/services/bodegas.service';
import { NotificationService } from 'src/app/core/services/notification.service';

import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
@Component({
  selector: 'app-bodegas-edit',
  templateUrl: './bodegas-edit.component.html',
  styleUrls: ['./bodegas-edit.component.css'],
})
export class BodegasEditComponent implements OnInit {
  constructor(
    private _vmP: VmParametrosService,
    private BodegasService: BodegasService,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  modelo: any;
  get vmP() {
    return this._vmP;
  }

  ngOnInit(): void {
    this.BodegasService.getid(this.vmP.id).subscribe(
      (data) => {
        this.modelo = data;
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
    this.BodegasService.put(this.vmP.id, this.modelo).subscribe(
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
