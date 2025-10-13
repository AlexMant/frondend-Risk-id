import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class GooleMpasService{

    apikeyGoogle: string;
    constructor(private httpClient: HttpClient) {
      this.apikeyGoogle = environment.apikeyGoogle;
    }

    mapsLoaded: boolean =false;

    init(render:any, document:any):Promise<any>{

        return new Promise((resolve) => {

            if(this.mapsLoaded){
                console.log('google script ya cargado');
                resolve(true);
                return;
            }
            console.log('google script sin cargar');
            this.mapsLoaded = true;

           

            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apikeyGoogle}&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = () => {
                resolve(true);
            };
            document.body.appendChild(script);



        });
     
    }



}