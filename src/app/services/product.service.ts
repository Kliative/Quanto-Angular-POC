import {Injectable} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { ProductItem } from '../product-search/product-item';
import { ProductBaseItem } from '../product-search/product-base-item';

import { PRODUCT_ITEMS } from '../product-search/product.data';
import { PRODUCT_BASE_ITEMS } from '../product-search/product-base.data';

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

    deleteProductItem(productItem: ProductItem,productBaseItem: ProductBaseItem){
        PRODUCT_ITEMS.splice(PRODUCT_ITEMS.indexOf(productItem), 1);
        PRODUCT_BASE_ITEMS.splice(PRODUCT_BASE_ITEMS.indexOf(productBaseItem), 1);
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