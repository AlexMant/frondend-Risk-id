import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BodegasService } from 'src/app/core/services/bodegas.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-bodegas-add',
  templateUrl: './bodegas-add.component.html',
  styleUrls: ['./bodegas-add.component.css'],
})
export class BodegasAddComponent implements OnInit {
  constructor(
    private BodegasService: BodegasService,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  modelo: any = { 
                    vdesbodega:null , 
                    vnombreencargado:null , 
                    vdireccionbodega:null , 
                    latitud:null , 
                    longitud:null , 
                    horarios:null , 
                    vtelefonobodega:null , 
                    vmailbodega:null , 
                    vobservacionbodega:null , 
                    vacapacidad:null , 
                    cestado:"V" , 
                    
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
    this.BodegasService.post(this.modelo).subscribe(
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
