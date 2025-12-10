import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CentrosdetrabajosService } from 'src/app/core/services/centrosdetrabajos.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-centrosdetrabajos-add',
  templateUrl: './centrosdetrabajos-add.component.html',
  styleUrls: ['./centrosdetrabajos-add.component.css']
})
export class CentrosdetrabajosAddComponent implements OnInit {
  constructor(
    private CentrosdetrabajosService: CentrosdetrabajosService,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  modelo: any = { id:null , 
                    empresaId:null , 
                    nombre:null , 
                    n_orden:null , 
                    esta_activo:null , 
                    usuarioscentrodetrabajo:[]
                    
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
    this.CentrosdetrabajosService.post(this.modelo).subscribe(
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
