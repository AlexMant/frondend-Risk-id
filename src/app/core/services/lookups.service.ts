import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class LookupsService extends BaseService {


  tiposEmpresa(): Observable<any> {
    return this.httpGet('/tipos-empresa');

  }

  tiposTarea(): Observable<any> {
    return this.httpGet('/tipos-tarea');

  }

  peligro(): Observable<any> {
    return this.httpGet('/peligros');

  }


  riesgos(): Observable<any> {
    return this.httpGet('/riesgos');

  }


  ubicaciones(): Observable<any> {
    return this.httpGet('/ubicaciones');

  }


  peligrosAdicionales(): Observable<any> {
    return this.httpGet('/peligros-adicionales');

  }


  factoresRiesgo(): Observable<any> {
    return this.httpGet('/factores-riesgo');

  }

  areas(): Observable<any> {
    return this.httpGet('/areas');

  }

  incidentes(): Observable<any> {
    return this.httpGet(' /lookups/incidentes');

  }

  
  danosProbables(): Observable<any> {
    return this.httpGet('/danos-probables');
    
  }

 
  caracterizacionesPersonal(): Observable<any> {
    return this.httpGet('/caracterizaciones-personal');
    
  }

 
  cargosPersonal(id:any): Observable<any> {
    return this.httpGet('/cargos-personal?centroTrabajoId=' + id);
    
  }

  partesAfectadas(): Observable<any> {
    return this.httpGet('/partes-afectadas');
  }

}
