import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { global } from './global';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlarmasService {
  url: string;
  constructor(
    public http: HTTP,
  ) {
    this.url = global.url;
  }

  mostrarAlarmas(): Promise<any> {
    //let headers = new HttpHeaders().set('Content-Type', 'applicaction/x-www-form-urllencoded');
    return this.http.post(this.url+"alarma.php",{},{});
    
    //return this.http.post(this.url + "alarmas.php", {}, { headers: headers });
  }

}

