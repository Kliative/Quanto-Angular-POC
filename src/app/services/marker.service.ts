import { Injectable } from '@angular/core';
import { Init } from '../init-markers';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MarkerService extends Init {
    constructor(private http: Http){
        super();
        // console.log('MarkerService Initialized...');
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
    //    return this.http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+-25.9355700+','+28.1270430+'&radius=500&type=restaurant&keyword=cruise&key=AIzaSyAbtMkAg1fagf0fV2bHY2FGn7yYm1-JrTI').map((response: Response) => response.json());
       return this.http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+-25.9355700+','+28.1270430+'&radius='+3000+'&type=store&keyword=grocery+store&key=AIzaSyAbtMkAg1fagf0fV2bHY2FGn7yYm1-JrTI').map((response: Response) => response.json());
    }

    inputResult(curLat:number, curLng:number, keyword:string, type:string){
        //   return this.http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=AIzaSyAbtMkAg1fagf0fV2bHY2FGn7yYm1-JrTI').map((response: Response) => response.json());
        if( curLat != null && curLng != null && keyword != null && type != null){
            // console.log('hit');        
            var searchResults = this.http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+curLat+','+curLng+'&radius='+5000+'&type='+type+'&keyword='+keyword+'&key=AIzaSyAbtMkAg1fagf0fV2bHY2FGn7yYm1-JrTI').map((response: Response) => response.json());
            return searchResults;
        }
       
    }
}