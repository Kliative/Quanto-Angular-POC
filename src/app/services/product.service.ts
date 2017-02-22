import {Injectable} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { ProductItem } from '../product-search/product-item';
import { ProductBaseItem } from '../product-search/product-base-item';
import { ExchangeService } from './exchange.service'


import { PRODUCT_ITEMS } from '../product-search/product.data';
import { PRODUCT_BASE_ITEMS } from '../product-search/product-base.data';

@Injectable()
export class ProductService {



    constructor(private http: Http, private _exchangeService: ExchangeService){}

    getProductItems() {
        return PRODUCT_ITEMS;
    }

    getProductBaseItems() {
        return PRODUCT_BASE_ITEMS;
    }

    addProductItem(productItem: ProductItem){
        // PRODUCT_ITEMS.push(productItem);
        var id = PRODUCT_ITEMS.length + 1;
        var found = PRODUCT_ITEMS.some(function (el) {
            return el.product === productItem.product;
        });
        //if array empty push object
        if(PRODUCT_ITEMS.length == 0){
            PRODUCT_ITEMS.push({product: productItem.product, range: productItem.range, quantity: productItem.quantity, price: productItem.price }); 
        } else {
                for (var i in PRODUCT_ITEMS) {
                    // if not in array add
                    if (PRODUCT_ITEMS[i].product !== productItem.product) {
                        if (!found) { 
                            PRODUCT_ITEMS.push({product: productItem.product, range: productItem.range, quantity: productItem.quantity, price: productItem.price }); 
                            break;
                        }
                    }
                    // if in array increase quantity and price (quantity * price)
                    if (PRODUCT_ITEMS[i].product == productItem.product) {
                        
                            PRODUCT_ITEMS[i].quantity = PRODUCT_ITEMS[i].quantity +1 ;

                            PRODUCT_ITEMS[i].price = Number(PRODUCT_ITEMS[i].price) + Number(productItem.price) ;
                            // console.log(PRODUCT_ITEMS[i]);
                            // console.log(PRODUCT_ITEMS[i].quantity);
                         
                        break;
                    }
                    
                }
        }      
    }
    
    addProductBaseItem(productBaseItem: ProductBaseItem){
        var found = PRODUCT_ITEMS.some(function (el) {
            return el.product === productBaseItem.product;
        });   
        //if array empty push object
        if(PRODUCT_BASE_ITEMS.length == 0){
                PRODUCT_BASE_ITEMS.push({product: productBaseItem.product,   range: productBaseItem.range, quantity: productBaseItem.quantity, price: productBaseItem.price }); 
        } else {
                for (var i in PRODUCT_BASE_ITEMS ) {
                    // if not in array add
                    if (PRODUCT_BASE_ITEMS[i].product !== productBaseItem.product) {
                        if (!found) { 
                        PRODUCT_BASE_ITEMS.push({product: productBaseItem.product, range: productBaseItem.range, quantity: productBaseItem.quantity, price: productBaseItem.price });

                        break;  
                        }
                        
                    }
                    // if in array increase quantity and price (quantity * price)
                    if (PRODUCT_BASE_ITEMS[i].product == productBaseItem.product) {
                        
                         PRODUCT_BASE_ITEMS[i].quantity = PRODUCT_BASE_ITEMS[i].quantity +1 ;

                         PRODUCT_BASE_ITEMS[i].price = Number(PRODUCT_BASE_ITEMS[i].price) + Number(productBaseItem.price) ;
                        //  console.log(PRODUCT_BASE_ITEMS[i]);
                        //  console.log(PRODUCT_BASE_ITEMS[i].quantity);
                      
                         break;
                    }
                
                }
        }
       
    }

    deleteProductItem(productItem: ProductItem,productBaseItem: ProductBaseItem){
        PRODUCT_ITEMS.splice(PRODUCT_ITEMS.indexOf(productItem), 1);
        PRODUCT_BASE_ITEMS.splice(PRODUCT_BASE_ITEMS.indexOf(productBaseItem), 1);
    }



    removeFromList(productItem: ProductItem, base: string, dest:string, product:string, range:string) {

        
         
        var indexNumb = PRODUCT_ITEMS.indexOf(productItem);

        // console.log(productItem);   
        // console.log(PRODUCT_ITEMS[indexNumb].price / PRODUCT_ITEMS[indexNumb].quantity);

        if(PRODUCT_ITEMS[indexNumb].quantity == 1 ){
            PRODUCT_ITEMS.splice(indexNumb, 1);   
        } else {
            PRODUCT_ITEMS[indexNumb].quantity = PRODUCT_ITEMS[indexNumb].quantity - 1;
            // PRODUCT_ITEMS[indexNumb].price = PRODUCT_ITEMS[indexNumb].price / PRODUCT_ITEMS[indexNumb].quantity;
        }
        
        if( PRODUCT_BASE_ITEMS[indexNumb].quantity == 1 ){
            PRODUCT_BASE_ITEMS.splice(indexNumb, 1);
        } else {
            PRODUCT_BASE_ITEMS[indexNumb].quantity = PRODUCT_BASE_ITEMS[indexNumb].quantity - 1;
            // PRODUCT_BASE_ITEMS[indexNumb].price = PRODUCT_BASE_ITEMS[indexNumb].price / PRODUCT_BASE_ITEMS[indexNumb].quantity;
        }

        this.searchData().subscribe(
                    data => {
                        for (var i = 0; i < data.length; i++) { 
                            if(data[i].ISO4217_currency_alphabetic_code == base){
                                var country = data[i];
                                PRODUCT_BASE_ITEMS[indexNumb].price = PRODUCT_BASE_ITEMS[indexNumb].price - country.products[product][range].p;

                                var baseProdPrices:number[]=[];

                                for (var j = 0; j < PRODUCT_BASE_ITEMS.length; j++ ) { 
                                        baseProdPrices.push(Number(PRODUCT_BASE_ITEMS[j].price));
                                }
                                
                                this._exchangeService.getEx().subscribe(
                                        data => {

                                    var totalCash = baseProdPrices.reduce((a, b) => a + b, 0);

                                    document.getElementById("totalBaseCountry").innerHTML = totalCash.toFixed(2).toString();

                                });
                            }
                            if(data[i].ISO4217_currency_alphabetic_code == dest){
                                var country = data[i];
                                PRODUCT_ITEMS[indexNumb].price = PRODUCT_ITEMS[indexNumb].price - country.products[product][range].p;
                                var prodPrices:number[]=[];

                                for (var j = 0; j < PRODUCT_ITEMS.length; j++ ) { 
                                        prodPrices.push(Number(PRODUCT_ITEMS[j].price));
                                }
                                    
                                this._exchangeService.getEx().subscribe(
                                        data => {
                                                  
                                            var totalCash = prodPrices.reduce((a, b) => a + b, 0);
                                            var baseCurrVal = data.rates[base];
                                            var destCurrVal = data.rates[dest];
                                           
                                             var baseToDollar = totalCash/destCurrVal;
                                             var finalConv = baseToDollar*baseCurrVal;

                                             document.getElementById("totalBaseCash").innerHTML = totalCash.toFixed(2).toString();
                                             document.getElementById("totalCash").innerHTML = finalConv.toFixed(2).toString();

                                            //  document.getElementById('delete').onclick = function() {
                                            //     document.getElementById("totalCash").innerHTML = finalConv.toFixed(2).toString();
                                            //     console.log('yeah');
                                            //  }​;
                                }); 
                            }
                        }

        });
        

    }

    addToList(productItem: ProductItem, base: string, dest:string, product:string, range:string) {

        
         
             var indexNumb = PRODUCT_ITEMS.indexOf(productItem);
      
            PRODUCT_ITEMS[indexNumb].quantity = PRODUCT_ITEMS[indexNumb].quantity + 1;
        
            PRODUCT_BASE_ITEMS[indexNumb].quantity = PRODUCT_BASE_ITEMS[indexNumb].quantity + 1;

       

        this.searchData().subscribe(
                    data => {
                        for (var i = 0; i < data.length; i++) { 
                            if(data[i].ISO4217_currency_alphabetic_code == base){
                                var country = data[i];
                                PRODUCT_BASE_ITEMS[indexNumb].price = Number(PRODUCT_BASE_ITEMS[indexNumb].price) + Number(country.products[product][range].p);

                                var baseProdPrices:number[]=[];

                                for (var j = 0; j < PRODUCT_BASE_ITEMS.length; j++ ) { 
                                        baseProdPrices.push(Number(PRODUCT_BASE_ITEMS[j].price));
                                }
                                
                                this._exchangeService.getEx().subscribe(
                                        data => {

                                    var totalCash = baseProdPrices.reduce((a, b) => a + b, 0);

                                    document.getElementById("totalBaseCountry").innerHTML = totalCash.toFixed(2).toString();

                                });
                            }
                            if(data[i].ISO4217_currency_alphabetic_code == dest){
                                var country = data[i];
                                PRODUCT_ITEMS[indexNumb].price = Number(PRODUCT_ITEMS[indexNumb].price) + Number(country.products[product][range].p);
                                var prodPrices:number[]=[];

                                for (var j = 0; j < PRODUCT_ITEMS.length; j++ ) { 
                                        prodPrices.push(Number(PRODUCT_ITEMS[j].price));
                                }
                                    
                                this._exchangeService.getEx().subscribe(
                                        data => {
                                                  
                                            var totalCash = prodPrices.reduce((a, b) => a + b, 0);
                                            var baseCurrVal = data.rates[base];
                                            var destCurrVal = data.rates[dest];
                                           
                                             var baseToDollar = totalCash/destCurrVal;
                                             var finalConv = baseToDollar*baseCurrVal;

                                             document.getElementById("totalBaseCash").innerHTML = totalCash.toFixed(2).toString();
                                             document.getElementById("totalCash").innerHTML = finalConv.toFixed(2).toString();


                                }); 
                            }
                        }

        });
        

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