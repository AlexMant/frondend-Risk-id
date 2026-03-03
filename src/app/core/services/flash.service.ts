import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class FlashService extends BaseService {

  getall(): Observable<any> {
    return this.httpGet('/Flash');
  }
  getid(id: any): Observable<any> {
    return this.httpGet('/Flash/' + id);
  }

  getbyparams(params: any): Observable<any> {

    return this.httpGet('/Flash' + params);
  }
  post(body: any): Observable<any> {
    return this.httpPost('/Flash', body);
  }


  PostData(formData: FormData): Observable<any> {
    return this.httpPostData('/Flash', formData);
  }
  put(id: any, body: any): Observable<any> {
    return this.httpPut('/Flash/' + id, body);
  }
  delete(id: any): Observable<any> {
    return this.httpDelete('/Flash/' + id);
  }


  async urlToFile(url: string, filename: string, mimeType: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: mimeType });
  }


}
