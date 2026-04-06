import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeligrosService } from 'src/app/core/services/peligros.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-peligros-add',
  templateUrl: './peligros-add.component.html',
  styleUrls: ['./peligros-add.component.css'],
})
export class PeligrosAddComponent implements OnInit {
  constructor(
    private PeligrosService: PeligrosService,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  modelo: any = { id:null , 
                    nombre:null , 
                    accion:'I',
                    
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
    this.PeligrosService.post(this.modelo).subscribe(
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
