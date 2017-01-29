import {Injectable} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { ProductItem } from './product-item';
import { PRODUCT_ITEMS } from './product.data';

@Injectable()
export class ProductService {

    constructor(private http: Http){}

    getProductItems() {
        return PRODUCT_ITEMS;
    }

    addProductItem(productItem: ProductItem){
        PRODUCT_ITEMS.push(productItem);
    }

    searchData(): Observable<any>{
      return this.http.get('/assets/js/countryJSON/product_rangetest.json')
                .map(response => response.json())
                .catch(error => {
                  console.error(error);
                return Observable.throw(error.json())
                });
    }
}