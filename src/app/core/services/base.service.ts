import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {

  baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  protected httpGet(url: string): Observable<any> {
    url = this.baseUrl + url;
    return this.httpClient.get<any>(url);

  }

  protected httpPost(url: string, body: object): Observable<any> {
    url = this.baseUrl + url;
    return this.httpClient.post<any>(url, body);
  }

  protected httpPut(url: string, body: any): Observable<any> {
    url = this.baseUrl + url;
    return this.httpClient.put<any>(url, body);
  }

  protected httpDelete(url: string): Observable<any> {
    url = this.baseUrl + url;
    return this.httpClient.delete<any>(url);
  }

  protected httpPostJsonH(url: string, body: object): Observable<any> {
    url = this.baseUrl + url;
    return this.httpClient.post<any>(url, body, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
  protected logWithGoogle(url: string,credential: string): Observable<any> {
    //this.path = "http://localhost:12895/LoginWithGoogle/"; 
    url = this.baseUrl + url;
    const header = new HttpHeaders().set('Content-type', "application/json");
   

    return this.httpClient.post(url, JSON.stringify(credential), {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }




  protected documentsDownload(url: string, iddocumento: any) {
    url = this.baseUrl + url;
    return this.httpClient.get(url + "?iddocumento=" + iddocumento, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

  protected documentsDownloadzip(url: string, id_valorizacion: any) {
    url = this.baseUrl + url;
    return this.httpClient.get(url + "?id_valorizacion=" + id_valorizacion, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

  protected documentsDownloadzipSolicitud(url: string, id_solicitud: any) {
    url = this.baseUrl + url;
    return this.httpClient.get(url + "?id_solicitud=" + id_solicitud, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }
  // protected httpGetparam(url: string, body: object): Observable<any> {
  //   url = this.baseUrl + url;
  //   console.log("url "+url);

  //   return this.httpClient.get<any>(url, {params: new HttpParams(body), headers: new HttpHeaders({'Content-Type': 'application/json'}) });
  // }


  // protected documentsDownloadzipUsuario(url: string, id: any, fdesde: any, fhasta: any) {
  //   url = this.baseUrl + url;
  //   return this.httpClient.get(url + "?id=" + id + "&fdesde=" + fdesde + "&fhasta=" + fhasta, {
  //     reportProgress: true,
  //     observe: 'events',
  //     responseType: 'blob'
  //   });
  // }
  // protected documentsDownloadzipEmpresa(url: string, id: any, fdesde: any, fhasta: any, idvalorizador: any) {
  //   url = this.baseUrl + url;
  //   return this.httpClient.get(url + "?id=" + id + "&fdesde=" + fdesde + "&fhasta=" + fhasta + "&idvalorizador=" + idvalorizador, {
  //     reportProgress: true,
  //     observe: 'events',
  //     responseType: 'blob'
  //   });
  // }

  protected docZip(url: string) {
    url = this.baseUrl + url;
    // console.log("url", url);
    return this.httpClient.get(url, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    }
    );

  }
  protected docZip2(url: string, body: any) {
     
    url = this.baseUrl + url;
    

    return this.httpClient.post(url, body , {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    }
    );

  }

}
