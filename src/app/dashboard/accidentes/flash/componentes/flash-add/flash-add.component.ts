import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashService } from 'src/app/core/services/flash.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-flash-add',
  templateUrl: './flash-add.component.html',
  styleUrls: ['./flash-add.component.css'],
})
export class FlashAddComponent implements OnInit {
  constructor(
    private FlashService: FlashService,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  modelo: any = { flashId:null , 
                    nombre:null , 
                    descripcion:null , 
                    tipoFlashId:null , 
                    fechaOcurrencia:null , 
                    danoProtencialId:null , 
                    danoRealId:null , 
                    ubicacionId:null , 
                    lugarEspecifico:null , 
                    tareaId:null , 
                    medidaInmediata:null , 
                    
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
    this.FlashService.post(this.modelo).subscribe(
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