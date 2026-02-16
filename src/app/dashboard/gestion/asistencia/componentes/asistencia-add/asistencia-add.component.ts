import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsistenciaService } from 'src/app/core/services/asistencia.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-asistencia-add',
  templateUrl: './asistencia-add.component.html',
  styleUrls: ['./asistencia-add.component.css'],
})
export class AsistenciaAddComponent implements OnInit {
  constructor(
    private AsistenciaService: AsistenciaService,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  modelo: any = { idasistencia:null , 
                    trabajadorId:null , 
                    fechaAsistencia:null , 
                    minutosTrabajados:null , 
                    
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
    this.AsistenciaService.post(this.modelo).subscribe(
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
