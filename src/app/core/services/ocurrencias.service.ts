import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class OcurrenciasService extends BaseService {

  getall(): Observable<any> {
    return this.httpGet('/ocurrencias');
  }
  getid(id: any): Observable<any> {
    return this.httpGet('/ocurrencias/' + id);
  }

  getbyparams(params: any): Observable<any> {

    return this.httpGet('/ocurrencias?' + params);
  }
  post(body: any): Observable<any> {
    return this.httpPost('/ocurrencias', body);
  }


  PostData(formData: FormData): Observable<any> {
    return this.httpPostData('/ocurrencias', formData);
  }
  put(id: any, body: any): Observable<any> {
    return this.httpPut('/ocurrencias/' + id, body);
  }
  delete(id: any): Observable<any> {
    return this.httpDelete('/ocurrencias/' + id);
  }


  async urlToFile(url: string, filename: string, mimeType: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: mimeType });
  }


}
