import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ForgotModel } from '../../core/interfaces/login.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EnvioMailService } from 'src/app/core/services/envio-mail.service';
import { LocalService } from 'src/app/core/services/local-services.service';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject()
  ngOnDestroy(): void {

    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
  submittedLogin = false;
  invalidDatos: boolean = false;
  credentials: ForgotModel = { email: '' };
  preloader: boolean = false;
  forgotForm!: FormGroup;
  errorlogin = '';

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

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.email]],

    });

  }

  forgotusuario() {
    this.submittedLogin = true;
    if (this.forgotForm.controls['mail'].status == 'INVALID') {

      this.errorlogin = 'E-mail no es valido.';
    }
    //  console.log("this.loginForm.invalid", this.loginForm.invalid)

    if (this.forgotForm.invalid) {
      return;
    }

    this.preloader = true;
    let usuario: ForgotModel =
    {
      email: this.forgotForm.value.mail,

    }
    //  console.log("usuario", usuario)
    this.authService.forgot(usuario).pipe(takeUntil(this.componentDestroyed$)).pipe(takeUntil(this.componentDestroyed$)).subscribe({
      next: (data) => {
        console.log(">>>>>>data", data);
        this.invalidDatos = false;
        // if (data == 1) {
          this.snackbar.notify('success', 'Contraseña recuerdada, por favor revise su correo electrónico.');
          this.router.navigate(["./auth/login"]);
        // }
        // if (data == 2) {
        //   this.snackbar.notify('danger', 'Usuario Inactivo');
        //   // this.router.navigate(["./.."]);
        // }
      },
      error: (err) => {
        // console.log(">>>>>>err",err),
        this.forgotForm.controls['mail'].setErrors({ 'incorrect': true });
        this.forgotForm.controls['mail'].markAsTouched();
        this.errorlogin = 'Error al intentar recuperar la contraseña, favor comunicarse con el administrador.';
        this.invalidDatos = true,
          this.preloader = false

      }
    }
    );
  }



  login() {
    this.router.navigate(["./auth/login"]);
  }


  validaCampodrecupera(key: string) { return this.forgotForm.controls[key].status; }

  validarmail() {
    let email = this.forgotForm.get('mail')?.value;

    if (email != null) {
      if (email.length > 0) {
        if (!this.validateEmail(email)) {

          this.forgotForm.controls['mail'].setErrors({ 'incorrect': true });
          this.forgotForm.controls['mail'].markAsTouched();
          this.errorlogin = 'El e-mail no es valido.';

        } else {

          this.errorlogin = '';
        }
      }
    } else {

      this.forgotForm.controls['mail'].setErrors({ 'incorrect': true });
      this.errorlogin = 'El email no es valido.';
    }
  }


  validateEmail(email: any) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }



}
