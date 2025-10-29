import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { NotificationService } from 'src/app/core/services/notification.service';


@Component({
  selector: 'app-empresa-add',
  templateUrl: './empresa-add.component.html',
  styleUrls: ['./empresa-add.component.css']
})
export class EmpresaAddComponent implements OnInit {
  constructor(
    private EmpresaService: EmpresaService,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  modelo: any = {
    //idempresa: null,
    vnombreEmpresa: null,
    vRut_empresa: null,
    vMail: null,
    cestado: null,
    vNombre_Responsable: null,
    vTelefono: null,

  };
  ngOnInit(): void { }

  cancelar() {
    console.log('cancelar');
    this.router.navigate(['./..'], {
      relativeTo: this.activatedRoute,
    });
  }
  guardar() {
    console.log('guardar');
    this.EmpresaService.post(this.modelo).subscribe(
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
