import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class HttpService {
  
  constructor(private http: Http) { }
// get single json object
  getData() {
    return this.http.get('https://quantotest-8a1ec.firebaseio.com/price.json').map((response: Response) => response.json());
  }
// upload data
  sendData(user: any){
    const body = JSON.stringify(user);
    const headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('https://quantotest-8a1ec.firebaseio.com/data.json', body, {
      headers: headers
    }).map((data: Response) => data.json());
  }

  getOwnData() {
    return this.http.get('https://quantotest-8a1ec.firebaseio.com/data.json').map((response: Response) => response.json());
  }

   getCurrentLocation(): Observable<any> {
        return this.http.get('http://ipinfo.io')
        .map((response: Response) => response.json())
        .catch(error => {
            console.log(error);
            return Observable.throw(error.json());
        });
    }

    

}
