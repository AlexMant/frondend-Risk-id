import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UbicacionesService } from 'src/app/core/services/ubicaciones.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-ubicaciones-add',
  templateUrl: './ubicaciones-add.component.html',
  styleUrls: ['./ubicaciones-add.component.css'],
})
export class UbicacionesAddComponent implements OnInit {
  constructor(
    private UbicacionesService: UbicacionesService,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  modelo: any = { idgen_ubicacion:null , 
                    nombre_ubicacion:null , 
                    idcentrodetrabajo:null , 
                    
};
  ngOnInit(): void {}

  cancelar() {
    console.log('cancelar');
    this.router.navigate(['./..'], {
      relativeTo: this.activatedRoute,
    });
  }
  guardar() {
    console.log('guardar');
    this.UbicacionesService.post(this.modelo).subscribe(
      (data) => {
        this.snackbar.notify('success', 'Registro agregado exitosamente');
        this.router.navigate(['./..'], {
          relativeTo: this.activatedRoute,
        });
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