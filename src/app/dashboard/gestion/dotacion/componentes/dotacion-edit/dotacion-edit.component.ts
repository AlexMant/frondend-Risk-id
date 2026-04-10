import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DotacionService } from 'src/app/core/services/dotacion.service';
import { NotificationService } from 'src/app/core/services/notification.service';

import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
@Component({
  selector: 'app-dotacion-edit',
  templateUrl: './dotacion-edit.component.html',
  styleUrls: ['./dotacion-edit.component.css'],
})
export class DotacionEditComponent implements OnInit {
  constructor(
    private _vmP: VmParametrosService,
    private DotacionService: DotacionService,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  modelo: any;
  get vmP() {
    return this._vmP;
  }

  ngOnInit(): void {
    this.DotacionService.getid(this.vmP.id).subscribe(
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
    this.DotacionService.put(this.vmP.id, this.modelo).subscribe(
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