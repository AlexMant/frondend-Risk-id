import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Fx } from 'src/app/utils/functions';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { TipousuarioService } from 'src/app/core/services/tipo-usuario.service';
@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})
export class UsuariosFormComponent implements   OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject()
  @Input() modelo: any;
  @Output() cancelar:  EventEmitter<any> = new EventEmitter();
  @Output() guardar:  EventEmitter<any> = new EventEmitter();
  constructor(private readonly fb: FormBuilder
    ,private snackbar: NotificationService
    , private readonly empresaService: EmpresaService
    , private readonly usuariosService: UsuariosService
    , private readonly tipousuarioService: TipousuarioService
  ) {}
  mantenedorForm!: FormGroup;

  ngOnDestroy(): void {

    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  check_tipo = JSON.parse(localStorage.getItem("userInfo")).check_tipo ?? 0;
  
  ngOnInit(): void {

    this.getdatatipousuario();
    this.getdataEmpresa();
    if (this.check_tipo != 1) {
     
      this.modelo.idempresa = JSON.parse(localStorage.getItem("userInfo")).idempresa;
    }
    this.mantenedorForm = this.fb.group({
//  idusuario: [this.modelo.idusuario, [Validators.required]], 
                    mail: [this.modelo.mail, [Validators.required]], 
                    nombreUsuario: [this.modelo.nombreUsuario, [Validators.required]], 
                    primerapellido: [this.modelo.primerapellido, [Validators.required]], 
                    segundoapellido: [this.modelo.segundoapellido], 
                    // vpassword: [this.modelo.vpassword, [Validators.required]], 
                    // vpassword_tmp: [this.modelo.vpassword_tmp, [Validators.required]], 
                    telefono: [this.modelo.telefono, [Validators.required]], 
                    rut: [Fx.getRutTranforma2(this.modelo.rut), [Validators.required]], 
                    // estado: [this.modelo.estado, [Validators.required]], 
                    // cta_validada: [this.modelo.cta_validada, [Validators.required]], 
                    // registro: [this.modelo.registro, [Validators.required]], 
                    // refreshtoken: [this.modelo.refreshtoken, [Validators.required]], 
                    // refreshtokenexpiredtime: [this.modelo.refreshtokenexpiredtime, [Validators.required]], 
                    // passwod_status: [this.modelo.passwod_status, [Validators.required]], 
                    // ultimaconexion: [this.modelo.ultimaconexion, [Validators.required]], 
                    idtipo_usuario: [this.modelo.idtipo_usuario, [Validators.required]], 
                    idempresa: [this.modelo.idempresa, [Validators.required, Validators.min(1)]], 
                    varea: [this.modelo.varea],
                    vcargo: [this.modelo.vcargo],
                    
    });
  }

  btnCancelar(){
    this.cancelar.emit();
  }
  btnGuardar(){

    if(this.mantenedorForm.invalid){
      return Object.values(this.mantenedorForm.controls).forEach(control=>{
        control.markAsTouched();
      });
     
    }

//  this.modelo.idusuario = this.mantenedorForm.get('idusuario')?.value;
                    this.modelo.mail = this.mantenedorForm.get('mail')?.value;
                    this.modelo.nombreUsuario = this.mantenedorForm.get('nombreUsuario')?.value;
                    this.modelo.primerapellido = this.mantenedorForm.get('primerapellido')?.value;
                    this.modelo.segundoapellido = this.mantenedorForm.get('segundoapellido')?.value;
                    // this.modelo.vpassword = this.mantenedorForm.get('vpassword')?.value;
                    // this.modelo.vpassword_tmp = this.mantenedorForm.get('vpassword_tmp')?.value;
                    this.modelo.telefono = this.mantenedorForm.get('telefono')?.value;
                    this.modelo.rut = this.mantenedorForm.get('rut')?.value;
                    // this.modelo.estado = this.mantenedorForm.get('estado')?.value;
                    // this.modelo.cta_validada = this.mantenedorForm.get('cta_validada')?.value;
                    // this.modelo.registro = this.mantenedorForm.get('registro')?.value;
                    // this.modelo.refreshtoken = this.mantenedorForm.get('refreshtoken')?.value;
                    // this.modelo.refreshtokenexpiredtime = this.mantenedorForm.get('refreshtokenexpiredtime')?.value;
                    // this.modelo.passwod_status = this.mantenedorForm.get('passwod_status')?.value;
                    // this.modelo.ultimaconexion = this.mantenedorForm.get('ultimaconexion')?.value;
                    this.modelo.idtipo_usuario = this.mantenedorForm.get('idtipo_usuario')?.value;

                    this.modelo.varea = this.mantenedorForm.get('varea')?.value;
                    this.modelo.vcargo = this.mantenedorForm.get('vcargo')?.value;


      if(this.check_tipo == 1){

        if(this.mantenedorForm.get('idempresa')?.value == null || this.mantenedorForm.get('idempresa')?.value == '' || this.mantenedorForm.get('idempresa')?.value == 0 || this.mantenedorForm.get('idempresa')?.value == undefined){
          this.snackbar.notify('danger', 'Seleccione una empresa');
          return;
        }

           this.modelo.idempresa = this.mantenedorForm.get('idempresa')?.value;

      }else{
            this.modelo.idempresa = JSON.parse(localStorage.getItem("userInfo")).idempresa;
      }
         
                    
                    
  

    this.guardar.emit();
  }

  datatipousuario: any[] = [];
  getdatatipousuario(){
    this.tipousuarioService.getall().subscribe(
      (data) => {
        if(this.check_tipo == 1){
        this.datatipousuario = data
        }else{
          this.datatipousuario = data.filter((a:any) => a.idtipo_usuario != 1)
        }
      },
      (err) => {
        this.datatipousuario = [];
      }
    );
  }

  dataempresas: any[] = [];
  getdataEmpresa(){
    this.empresaService.getall().subscribe(
      (data) => {
        this.dataempresas = data
        this.selectedempresa = this.dataempresas;
      },
      (err) => {
        this.dataempresas = [];
      }
    );
  }

  
  selectedempresa: any = [];

  search(event: any) {
    // console.log('query',event.target.value)
    let result = this.select(event.target.value)
    this.selectedempresa = result;
  }


  select(query: string): string[] {
    let result: string[] = [];
    for (let a of this.dataempresas) {
      if (a.vdesbodega.toLowerCase().indexOf(query) > -1) {
        result.push(a)
      }
    }
    return result
  }

  validaRut() {
    let rut = this.mantenedorForm.get('rut')?.value;

    let rut2 = Fx.getRutTranforma2(rut);

    if (rut2 != '') {
      this.mantenedorForm.patchValue({ ['rut']: rut2 })

    } else {
      this.snackbar.notify('danger', 'Rut no valido');
      this.mantenedorForm.patchValue({ ['rut']: '' })
      this.mantenedorForm.controls['rut'].setErrors({ 'incorrect': true });
      this.mantenedorForm.controls['rut'].markAsTouched();
    }

  }

  errorMail: any;
  validarmail() {
    let email = this.mantenedorForm.get('mail')?.value;

    if (email != null) {
      if (email.length > 0) {
        if (!this.validateEmail(email)) {
          this.mantenedorForm.controls['mail'].setErrors({ 'incorrect': true });
          this.mantenedorForm.controls['mail'].markAsTouched();
          this.errorMail = 'El  E-mail no es valido.';

        } else {


          this.usuariosService.valmailusuario(email).pipe(takeUntil(this.componentDestroyed$)).pipe(takeUntil(this.componentDestroyed$)).subscribe(
            (data) => {
              if (data == 2) {
                this.mantenedorForm.controls['mail'].setErrors({ 'incorrect': true });
                this.mantenedorForm.controls['mail'].markAsTouched();
                this.snackbar.notify('danger', 'El  E-mail ya se encuentra registrado en la base de datos.');
                this.errorMail = 'El   E-mail ya se encuentra registrado.';
              }

            },
            (err) => {
              console.log(">>>>>>err", err)


            }
          );


          // this.errorlogin = '';
        }
      }
    } else {
      this.mantenedorForm.controls['mail'].setErrors({ 'incorrect': true });
      this.errorMail = 'Ingrese  E-mail';
      // this.errorlogin = 'El email no es valido.';
    }
  }

  validateEmail(email: any) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

   
}