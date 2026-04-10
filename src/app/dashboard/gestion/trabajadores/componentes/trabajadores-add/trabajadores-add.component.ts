import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrabajadoresService } from 'src/app/core/services/trabajadores.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-trabajadores-add',
  templateUrl: './trabajadores-add.component.html',
  styleUrls: ['./trabajadores-add.component.css'],
})
export class TrabajadoresAddComponent implements OnInit {
  constructor(
    private TrabajadoresService: TrabajadoresService,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  modelo: any = {
     
    id: undefined,
    nombre: null,
    rut: null,
    telefono: null,
    email: null,
    direccion: null,
    empresaId: null,
    accion: 'I'

  };
  ngOnInit(): void { }

  cancelar() {
    console.log('cancelar');
    this.router.navigate(['./..'], {
      relativeTo: this.activatedRoute,
    });
  }
  guardar() {
    console.log('guardar', this.modelo);
    this.TrabajadoresService.post(this.modelo).subscribe(
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