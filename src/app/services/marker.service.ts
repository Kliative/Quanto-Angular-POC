import { Injectable } from '@angular/core';
import { Init } from '../init-markers';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MarkerService extends Init {
    constructor(private http: Http){
        super();
        console.log('MarkerService Initialized...');
        this.load();
    }

    getMarkers(){
        var markers = JSON.parse(localStorage.getItem('markers'));
        return markers;
    }
    addMarker(newMarker){
        // Fetch getMarkers
        var markers = JSON.parse(localStorage.getItem('markers'));

        markers.push(newMarker);
        // Set ls markers again
        localStorage.setItem('markers', JSON.stringify(markers));
    }

    getSearch(curLat:number, curLng:number){
        // console.log('getSearch');
       return this.http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDkXM2xF6yavfcJ7ZX4sDP22CmxMXk-HAI&sensor=false&location='+-25.9355700+','+28.1270430+'&radius='+3000+'&keyword=%22grocery+store%22').map((response: Response) => response.json());
    //    return this.http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyBVRN-2t_P2hsg5upKtgH_mu-SKA1RPWrM&sensor=false&location='+curLat+','+curLng+'&radius='+50+'&keyword=%22grocery+store%22&name=%22grocery+store%22').map((response: Response) => response.json());
    }

    inputResult(curLat:number, curLng:number, keyword:string){
        // console.log('hit');
       return this.http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDkXM2xF6yavfcJ7ZX4sDP22CmxMXk-HAI&sensor=false&location='+curLat+','+curLng+'&radius='+5000+'&keyword=%22'+keyword+'%22').map((response: Response) => response.json());
    //    return this.http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyBVRN-2t_P2hsg5upKtgH_mu-SKA1RPWrM&sensor=false&location='+curLat+','+curLng+'&radius='+50+'&keyword=%22grocery+store%22&name=%22grocery+store%22').map((response: Response) => response.json());
    }
}