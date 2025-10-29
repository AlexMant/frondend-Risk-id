import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-usuarios-add',
  templateUrl: './usuarios-add.component.html',
  styleUrls: ['./usuarios-add.component.css']
})
export class UsuariosAddComponent implements OnInit {
  constructor(
    private UsuariosService: UsuariosService,
    private snackbar: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  modelo: any = { 
    
                    mail:null , 
                    nombreUsuario:null , 
                    primerapellido:null , 
                    segundoapellido:null , 
                    vpassword:null , 
                    vpassword_tmp:null , 
                    telefono:null , 
                    rut:null , 
                    estado:null , 
                    cta_validada:null , 
                    registro:null , 
                    refreshtoken:null , 
                    refreshtokenexpiredtime:null , 
                    passwod_status:null , 
                    ultimaconexion:null , 
                    idtipo_usuario:null , 
                    idempresa:null , 
                    varea:null ,
                    vcago:null ,
                    
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
    this.UsuariosService.post(this.modelo).subscribe(
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
