import {Injectable} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { ProductItem } from './product-item';
import { ProductBaseItem } from './product-base-item';

import { PRODUCT_ITEMS } from './product.data';
import { PRODUCT_BASE_ITEMS } from './product-base.data';

@Injectable()
export class ProductService {

    constructor(private http: Http){}

    getProductItems() {
        return PRODUCT_ITEMS;
    }

    getProductBaseItems() {
        return PRODUCT_BASE_ITEMS;
    }

    addProductItem(productItem: ProductItem){
        PRODUCT_ITEMS.push(productItem);
    }
    addProductBaseItem(productBaseItem: ProductBaseItem){
        PRODUCT_BASE_ITEMS.push(productBaseItem);
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