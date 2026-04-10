import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DanosProbablesService } from 'src/app/core/services/danos-probables.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';

@Component({
  selector: 'app-danos-probable-edit',
  templateUrl: './danos-probable-edit.component.html',
  styleUrls: ['./danos-probable-edit.component.css']
})
export class DanosProbableEditComponent implements OnInit {
  constructor(
    private _vmP: VmParametrosService,
    private danosprobableService: DanosProbablesService,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  modelo: any;
  get vmP() {
    return this._vmP;
  }

  ngOnInit(): void {
    this.danosprobableService.getid(this.vmP.id).subscribe(
      (data) => {
        this.modelo = data.data;
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
    this.danosprobableService.put(this.vmP.id, this.modelo).subscribe(
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

