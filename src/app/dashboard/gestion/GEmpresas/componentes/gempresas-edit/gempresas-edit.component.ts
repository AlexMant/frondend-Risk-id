import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GEmpresasService } from 'src/app/core/services/gempresas.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';

@Component({
  selector: 'app-gempresas-edit',
  templateUrl: './gempresas-edit.component.html',
  styleUrls: ['./gempresas-edit.component.css']
})
export class GEmpresasEditComponent  implements OnInit {
  constructor(
    private _vmP: VmParametrosService,
    private GEmpresasService: GEmpresasService,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  modelo: any;
  get vmP() {
    return this._vmP;
  }

  ngOnInit(): void {
    this.GEmpresasService.getid(this.vmP.id).subscribe(
      (data) => {
        console.log("data empresa edit", data.data);
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
    this.GEmpresasService.put(this.vmP.id, this.modelo).subscribe(
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
