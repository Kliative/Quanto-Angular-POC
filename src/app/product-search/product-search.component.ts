import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service'
import { ExchangeService } from '../services/exchange.service'

import { ProductItem } from './product-item';
import { ProductBaseItem } from './product-base-item';

import { PRODUCT_BASE_ITEMS } from './product-base.data';
import { PRODUCT_ITEMS } from './product.data';

@Component({
  selector: 'product-search-root',
   templateUrl: 'product-search.component.html',
   styleUrls: ['product-search.component.css']
})

export class ProductSearchComponent implements OnInit {
     public totalDestCash: string;
     public totalCash: string;
     public totalBaseCountry: string;

     public listDataForm: FormGroup;

     constructor (private _sFb:FormBuilder, private _productService: ProductService, private _exchangeService: ExchangeService){}
     

    ngOnInit() {
            
            this.listDataForm = this._sFb.group({
                product: '',
                listBaseCurrency: '',
                listDestinationCurrency: '',
                productRange: ''
                
            });
     
    }
    clearAll(){
        this._productService.deleteAll();
        this.reCalc();
    }
    reCalc(){
        
        this._exchangeService.getEx().subscribe(
                                        data => {
                                            
                                            var prodPrices:number[]=[];

                                            for (var j = 0; j < PRODUCT_ITEMS.length; j++ ) { 
                                                    prodPrices.push(Number(PRODUCT_ITEMS[j].price));
                                            }

                                            var totalCash = prodPrices.reduce((a, b) => a + b, 0);
                                            var baseCurrVal = data.rates[this.listDataForm.controls['listBaseCurrency'].value];
                                            var destCurrVal = data.rates[this.listDataForm.controls['listDestinationCurrency'].value];
                                           
                                             var baseToDollar = totalCash/destCurrVal;
                                             var finalConv = baseToDollar*baseCurrVal;

                                             
                                            //  document.getElementById("totalCash").innerHTML = finalConv.toFixed(2).toString();
                                             document.getElementById("totalCash-open").innerHTML = finalConv.toFixed(2).toString();
                                            
                                }); 
    }

    onAddProd(form: FormGroup){
        // console.log(form);
        this._productService.searchData()
                .subscribe(
                    data => {
                            for (var i = 0; i < data.length; i++) { 

                            if(data[i].ISO4217_currency_alphabetic_code == this.listDataForm.controls['listDestinationCurrency'].value){

                                var country = data[i];
                                var range = this.listDataForm.controls['productRange'];
                                const productItem = new ProductItem(this.listDataForm.controls['product'].value, range.value, 1, country.products[this.listDataForm.controls['product'].value][this.listDataForm.controls['productRange'].value].p);
                                
                                // console.log(productItem);

                                this._productService.addProductItem(productItem);

                                var prodPrices:number[]=[];

                                for (var j = 0; j < PRODUCT_ITEMS.length; j++ ) { 
                                        prodPrices.push(Number(PRODUCT_ITEMS[j].price));
                                }
                                    
                                this._exchangeService.getEx().subscribe(
                                        data => {
                                                  
                                            var totalCash = prodPrices.reduce((a, b) => a + b, 0);
                                            var baseCurrVal = data.rates[this.listDataForm.controls['listBaseCurrency'].value];
                                            var destCurrVal = data.rates[this.listDataForm.controls['listDestinationCurrency'].value];
                                           
                                             var baseToDollar = totalCash/destCurrVal;
                                             var finalConv = baseToDollar*baseCurrVal;

                                            //  document.getElementById("totalDestCash").innerHTML = totalCash.toFixed(2).toString();
                                             document.getElementById("totalDestCash-open").innerHTML = totalCash.toFixed(2).toString();
                                             
                                            //  document.getElementById("totalCash").innerHTML = finalConv.toFixed(2).toString();
                                             document.getElementById("totalCash-open").innerHTML = finalConv.toFixed(2).toString();
                                             
                                });                               
                            }
                            if(data[i].ISO4217_currency_alphabetic_code == this.listDataForm.controls['listBaseCurrency'].value){


                                var country = data[i];
                                var range = this.listDataForm.controls['productRange'];
                                const productBaseItem = new ProductBaseItem(this.listDataForm.controls['product'].value, range.value, 1, country.products[this.listDataForm.controls['product'].value][this.listDataForm.controls['productRange'].value].p);
                                
                                this._productService.addProductBaseItem(productBaseItem);
 
                                var baseProdPrices:number[]=[];

                                for (var j = 0; j < PRODUCT_BASE_ITEMS.length; j++ ) { 
                                        baseProdPrices.push(Number(PRODUCT_BASE_ITEMS[j].price));
                                }
                                
                                this._exchangeService.getEx().subscribe(
                                        data => {

                                    var totalCash = baseProdPrices.reduce((a, b) => a + b, 0);

                                    
                                    document.getElementById("totalBaseCountry-open").innerHTML = totalCash.toFixed(2).toString();
                                });                               
                            }
                        }
                    }
                );
    }
}