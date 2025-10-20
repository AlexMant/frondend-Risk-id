import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HardwareService } from 'src/app/core/services/hardware.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-hardware-add',
  templateUrl: './hardware-add.component.html',
  styleUrls: ['./hardware-add.component.css'],
})
export class HardwareAddComponent implements OnInit {
  constructor(
    private HardwareService: HardwareService,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  modelo: any = { 
                    iditems:null , 
                    idempresa:null , 
                    idbodega:null , 
                    vmarca:null , 
                    vmodelo:null , 
                    vnumerodeparte:null , 
                    vnumeroserie:null , 
                    dfechaRegistro:null , 
                    dfechamantencion:null , 
                    vobservacion:null , 
                    cestado:"D"
                    
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
    this.HardwareService.post(this.modelo).subscribe(
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
