import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DotacionService } from 'src/app/core/services/dotacion.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-dotacion-add',
  templateUrl: './dotacion-add.component.html',
  styleUrls: ['./dotacion-add.component.css'],
})
export class DotacionAddComponent implements OnInit {
  constructor(
    private DotacionService: DotacionService,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  modelo: any = { iddotacion:null , 
                    trabajadorId:null , 
                    cargopersonalId:null , 
                    centroTrabjoId:null , 
                    fechaInicio:null , 
                    fechaTermino:null , 
                    
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
    this.DotacionService.post(this.modelo).subscribe(
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
