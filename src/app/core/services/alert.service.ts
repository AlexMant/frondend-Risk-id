import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Servicio para mostrar alertas en la aplicación.
 * Utiliza un Subject para emitir mensajes y tiempos de alerta.
 */
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSource = new Subject();
  /** Observable para suscribirse a las alertas. */
  alert$ = this.alertSource.asObservable();

  constructor() { }

  /**
   * Muestra una alerta con mensaje y tiempo opcional.
   * @param message Mensaje de la alerta.
   * @param time Tiempo en milisegundos (por defecto 5000).
   */
  showAlert(message: string, time: number = 5000) {
    console.log('showAlert', message, time);
    this.alertSource.next({ message, time });
  }
}
