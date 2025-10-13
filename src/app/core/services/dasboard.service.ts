import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class DasboardService extends BaseService {

   
  getmissdatosit(id:any): Observable<any> {
    return this.httpGet('api/Dashboard/getmissdatosit/'+id);
  }

  getmisdatosadmin(id:any): Observable<any> {
    return this.httpGet('api/Dashboard/getmisdatosadmin/'+id);
  }

  graficoit(id:any): Observable<any> {
    return this.httpGet('api/Dashboard/graficoit/'+id);
  }

  getgraficoadmin(id:any): Observable<any> {
    return this.httpGet('api/Dashboard/getgraficoadmin/'+id);
  }


   


}
