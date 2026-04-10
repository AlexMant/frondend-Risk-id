import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PermisosusuariosService  extends BaseService {

 
  getPermisosUsuario(id:any): Observable<any> {
    return this.httpGet('/usuarios/'+id+'/permisos');
  }
}
