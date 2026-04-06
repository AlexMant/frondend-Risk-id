import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-acceso-denegado',
    template: `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; background: #fff; text-align: center; position: relative;">
      
    
  <mat-icon style="font-size: 64px; color: #bdbdbd; margin-bottom: 16px;">error_outline</mat-icon>
      <h2 style="color: #333; margin-bottom: 16px;">Acceso denegado</h2>
      <p style="max-width: 480px; margin: 0 auto 32px auto; color: #666;">
        Se requiere tener permisos para ingresar a la opción requerida.<br>
        Para solicitarlos debe comunicarse con el administrador.
      </p>
      <button *ngIf="isLoggedIn" mat-raised-button color="primary" (click)="volver()" style="margin-bottom: 32px; min-width: 220px;">Volver al dashboard</button>
      <div style="position: absolute; bottom: 16px; left: 0; width: 100%; text-align: center; color: #aaa; font-size: 12px;">
        © 2026 RISK-ID. Todos los derechos reservados.
      </div>
    </div>

  `,
})
export class AccesoDenegadoComponent {
    isLoggedIn = false;
    constructor(private router: Router) {
        this.isLoggedIn = !!localStorage.getItem('jwt');
    }
    volver() {
        this.router.navigate(['/dashboard']);
    }
}
