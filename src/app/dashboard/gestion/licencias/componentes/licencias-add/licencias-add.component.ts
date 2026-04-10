import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LicenciasService } from 'src/app/core/services/licencias.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-licencias-add',
  templateUrl: './licencias-add.component.html',
  styleUrls: ['./licencias-add.component.css'],
})
export class LicenciasAddComponent implements OnInit {
  constructor(
    private LicenciasService: LicenciasService,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  modelo: any = { licenciaId:null , 
                    trabajadorId:null , 
                    ocurrenciaId:null , 
                    fechaInicio:null , 
                    fechaTermino:null , 
                    tipolicenciaId:null , 
                    file:null
                    
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
    this.LicenciasService.post(this.modelo).subscribe(
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
