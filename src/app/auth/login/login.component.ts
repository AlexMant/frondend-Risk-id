import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, EventEmitter, NgZone, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  HttpErrorResponse
} from '@angular/common/http';
import { AuthenticatedResponse } from '../../core/interfaces/authenticated-response.model';
import { LoginModel } from '../../core/interfaces/login.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Fx } from 'src/app/utils/functions';
import { LocalService } from 'src/app/core/services/local-services.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationService } from 'src/app/core/services/notification.service';
import { EnvioMailService } from 'src/app/core/services/envio-mail.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['././login.component.scss']
})
export class LoginComponent   implements OnInit, OnDestroy {

  @Output() NewItem: EventEmitter<any> = new EventEmitter<string>();

  componentDestroyed$: Subject<boolean> = new Subject()
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  submitted = false;
  submittedLogin = false;
  errorlogin = '';
  errorRegistro = '';
  preloader: boolean = false;
  preloaderR: boolean = false;

  ngOnDestroy(): void {

    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }





  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private authService: AuthService,
    private localStore: LocalService,
    private formBuilder: FormBuilder,
    private snackbar: NotificationService,
    private envioMailService: EnvioMailService,
    private _ngZone: NgZone,
    private activatedRoute: ActivatedRoute,

  ) { }




  ngOnInit(): void {


    this.loginForm = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.email]],
      vpassword: ['', Validators.required]
    });
    this.registerForm = this.formBuilder.group({
      Vmail: ['', [Validators.required, Validators.email]],
      vpassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      VnombreUsuario: ['', Validators.required],
      VprimerApellido: ['', Validators.required],
      rut: ['', Validators.required],
      vpassword2: ['', Validators.required],
      vtelefono: ['', Validators.required],
    });

    
    
     

  }
 
 
 



  validaCampod(key: string) {

    return this.registerForm.controls[key].status;

  }

  validaCampodLogin(key: string) { return this.loginForm.controls[key].status; }

  loginusuario() {
    this.submittedLogin = true;
    if (this.loginForm.controls['mail'].status == 'INVALID' || this.loginForm.controls['vpassword'].status == 'INVALID') {

      this.errorlogin = 'Existen campos con errores favor revisar';
    }
  //  console.log("this.loginForm.invalid", this.loginForm.invalid)

    if (this.loginForm.invalid) {
      return;
    }

    this.preloader = true;
    let usuario: LoginModel =
    {
      email: this.loginForm.value.mail,
      password:  this.loginForm.value.vpassword

       // password: Fx.encrypPass(this.loginForm.value.vpassword)
    }
  console.log("usuario", usuario)
    this.authService.login(usuario).pipe(takeUntil(this.componentDestroyed$)).pipe(takeUntil(this.componentDestroyed$)).subscribe({
      next: (response: AuthenticatedResponse) => {
       // console.log("response", response)
       this.generarToken(response);
      

      },
      error: (err: HttpErrorResponse) => (
        this.preloader = false,
        this.errorlogin = 'Usuario o contraseña incorrecta.'
      ),
    });
  }

  generarToken(response: AuthenticatedResponse) {


    const token = response.accessToken;
    const refreshToken = response.refreshToken;
    const datsusuario = response.data.user;
    const dataempresa = response.data.empresa;
   console.log("datsusuario",datsusuario)
    const userInfo = {
      passwordStatus: datsusuario.debe_cambiar_contrasena,
      usuarioConectado: datsusuario.nombre,
      idusuario: this.jwtHelper.decodeToken(token).id,
      mailusuario: this.jwtHelper.decodeToken(token).email,

      cambiapass: datsusuario.debe_cambiar_contrasena,
 
      permiso: datsusuario.permiso,
       permiso_nombre: datsusuario.permiso_nombre,
       estado: datsusuario.estado,
       
      telefono: datsusuario.telefono,
      idempresa: dataempresa.id,
      nombreempresa: dataempresa.nombre,
    }

    this.localStore.saveData('userInfo', JSON.stringify(userInfo));
    this.localStore.saveData('jwt', token);
    this.localStore.saveData('refreshToken', refreshToken);


    this.router.navigate(['./dashboard']);
    
  }

 


  validarmail() {
    let email = this.loginForm.get('mail')?.value;
   
    if (email != null) {
      if (email.length > 0) {
        if (!this.validateEmail(email)) {
         
          this.loginForm.controls['mail'].setErrors({ 'incorrect': true });
          this.loginForm.controls['mail'].markAsTouched();
          this.errorlogin = 'El e-mail no es valido.';

        } else {
          
          this.errorlogin = '';
        }
      }
    } else {
     
      this.loginForm.controls['mail'].setErrors({ 'incorrect': true });
      this.errorlogin = 'El email no es valido.';
    }
  }

  validarmailRegistro() {
    let email = this.registerForm.get('Vmail')?.value;
    if (email != null) {
      if (email.length > 0) {
        if (!this.validateEmail(email)) {
          this.registerForm.controls.Vmail.setErrors({ 'incorrect': true });
          this.registerForm.controls['Vmail'].markAsTouched();
          this.errorRegistro = 'El E-mail no es valido.';

        } else {
          this.errorRegistro = '';
        }
      }
    } else {
      this.registerForm.controls.Vmail.setErrors({ 'incorrect': true });
      this.registerForm.controls['Vmail'].markAsTouched();
      this.errorRegistro = 'El email no es valido.';
    }
  }


  validateEmail(email: any) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }


 
  recuperarPas() {
   console.log("recuperarPas")
   this.router.navigate(["./auth/recuperar"]);
  }


  validaRut() {
    let rut = this.registerForm.get('rut')?.value;

    let rut2 = Fx.getRutTranforma2(rut);

    if (rut2 != '') {
      this.registerForm.patchValue({ ['rut']: rut2 })

    } else {
      this.snackbar.notify('danger', 'Rut no valido');
      this.registerForm.patchValue({ ['rut']: '' })
      this.registerForm.controls['rut'].setErrors({ 'incorrect': true });
      this.registerForm.controls['rut'].markAsTouched();
    }

  }

  validaContraseniaa(campo: any) {
    let vpassword = this.registerForm.get('vpassword')?.value;
    let vpassword2 = this.registerForm.get('vpassword2')?.value;

    if (campo == 1) {
      if (vpassword != '') {

        if (vpassword.length < 6 || vpassword.length > 40) {
          this.snackbar.notify('danger', 'La contraseña debe tener entre 6 y 40 caracteres');
          this.registerForm.controls['vpassword'].setErrors({ 'incorrect': true });
          this.registerForm.controls['vpassword'].markAsTouched();
        } else {
          if (vpassword2 != null && vpassword2.length > 0) {
            if (vpassword != vpassword2) {
              this.registerForm.controls['vpassword2'].setErrors({ 'incorrect': true });
              this.registerForm.controls['vpassword2'].markAsTouched();
              this.snackbar.notify('danger', 'Las contraseñas no coinciden');
            }
          }
        }
      }
    }

    if (campo == 2) {
      if (vpassword != null && vpassword.length > 0 && vpassword2 != null && vpassword2.length > 0) {
        if (vpassword != vpassword2) {
          this.registerForm.controls['vpassword2'].setErrors({ 'incorrect': true });
          this.registerForm.controls['vpassword2'].markAsTouched();
          this.snackbar.notify('danger', 'Las contraseñas no coinciden');
        }
      }
    }
  }
  //mostrar contraseña angular  formcontrol

  hide1 = false;
  mostrarContrasena() {
    this.hide1 = !this.hide1;

  }
  hide2 = false;
  mostrarContrasena2() {
    this.hide2 = !this.hide2;

  }
  hide3 = false;
  mostrarContrasena3() {
    this.hide3 = !this.hide3;

  }
}
