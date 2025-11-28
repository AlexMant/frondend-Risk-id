import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DanosProbablesService } from 'src/app/core/services/danos-probables.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-danos-probable-add',
  templateUrl: './danos-probable-add.component.html',
  styleUrls: ['./danos-probable-add.component.css']
})
export class DanosProbableAddComponent implements OnInit {
  constructor(
    private danosprobableService: DanosProbablesService,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  modelo: any = { idgen_danoprobable:null , 
                    nombre_danoprobable:null , 
                    
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
    this.danosprobableService.post(this.modelo).subscribe(
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
