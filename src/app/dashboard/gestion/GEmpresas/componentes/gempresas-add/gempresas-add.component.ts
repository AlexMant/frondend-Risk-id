import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GEmpresasService } from 'src/app/core/services/gempresas.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-gempresas-add',
  templateUrl: './gempresas-add.component.html',
  styleUrls: ['./gempresas-add.component.css']
})
export class GEmpresasAddComponent implements OnInit {
  constructor(
    private GEmpresasService: GEmpresasService,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  modelo: any = { idgen_gempresas:null , 
                    nombres_gempresas:null , 
                    rut_gempresas:null , 
                    estado_gempresas:null , 
                    observaciones_gempresas:null , 
                    codigo_gempresas:null , 
                    
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
    this.GEmpresasService.post(this.modelo).subscribe(
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
