import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProcesosService } from 'src/app/core/services/procesos.service';

@Component({
  selector: 'app-procesos-add',
  templateUrl: './procesos-add.component.html',
  styleUrls: ['./procesos-add.component.css']
})
export class ProcesosAddComponent implements OnInit {
  constructor(
    private prcoesos: ProcesosService,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  modelo: any = { id:null , 
                    nombre:null , 
                    n_orden:null , 
                    
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
    this.prcoesos.post(this.modelo).subscribe(
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
