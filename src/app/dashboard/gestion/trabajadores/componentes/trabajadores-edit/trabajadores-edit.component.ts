import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrabajadoresService } from 'src/app/core/services/trabajadores.service';
import { NotificationService } from 'src/app/core/services/notification.service';

import { VmParametrosService } from 'src/app/core/viewmodel/vm-parametros.service';
@Component({
  selector: 'app-trabajadores-edit',
  templateUrl: './trabajadores-edit.component.html',
  styleUrls: ['./trabajadores-edit.component.css'],
})
export class TrabajadoresEditComponent implements OnInit {
  constructor(
    private _vmP: VmParametrosService,
    private TrabajadoresService: TrabajadoresService,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
 
  get vmP() {
    return this._vmP;
  }

 
                    
  modelo: any;

  ngOnInit(): void {
    this.TrabajadoresService.getid(this.vmP.id).subscribe(
      (data) => {
       
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
    this.TrabajadoresService.put(this.vmP.id, this.modelo).subscribe(
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
