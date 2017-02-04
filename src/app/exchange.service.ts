import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class ExchangeService {
  
  constructor(private http: Http) { }
// get single json object
  getEx() {
    return this.http.get('https://openexchangerates.org/api/latest.json?app_id=8189c190e69d471fb0b4abfba0a7c023').map((response: Response) => response.json());
  }
  convertPrice(price:any, dest:string, base:string) {
    return this.http.get('https://openexchangerates.org/api/convert/'+price+'/'+dest+'/'+base+'?app_id=8189c190e69d471fb0b4abfba0a7c023').map((response: Response) => response.json());
  }
  getExchangeRate(): Observable<any> {
      return this.http.get('https://openexchangerates.org/api/latest.json?app_id=8189c190e69d471fb0b4abfba0a7c023')
      .map((response: Response) => response.json())
      .catch(error => {
          console.log(error);
          return Observable.throw(error.json());
      });
  }

}
