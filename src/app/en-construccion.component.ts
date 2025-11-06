import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-en-construccion',
  template: `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 80vh;">
      <mat-icon style="font-size: 64px; color: #1976d2; margin-bottom: 16px;">build</mat-icon>
      <h2>Página en construcción</h2>
      <p>La URL que intentaste acceder no existe o está en desarrollo.</p>
      <button *ngIf="isLoggedIn" mat-raised-button color="primary" (click)="volver()" style="margin-top: 24px;">Volver al inicio</button>
    </div>
  `,
})
export class EnConstruccionComponent {
  isLoggedIn = false;
  constructor(private router: Router) {
    this.isLoggedIn = !!localStorage.getItem('jwt');
  }
  volver() {
    this.router.navigate(['/dashboard']);
  }
}
