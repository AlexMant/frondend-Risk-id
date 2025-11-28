import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CargosPersonalService } from 'src/app/core/services/cargos-personal.service';
 
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-cargos-personales-add',
  templateUrl: './cargos-personales-add.component.html',
  styleUrls: ['./cargos-personales-add.component.css'],
})
export class CargospersonalesAddComponent implements OnInit {
  constructor(
    private cargosPersonalService: CargosPersonalService,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  modelo: any = { idgen_cargos_personal:null , 
                    nombre_cargos_personal:null , 
                    idcentrotrabajo:null , 
                    
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
    this.cargosPersonalService.post(this.modelo).subscribe(
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
