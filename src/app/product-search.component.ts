import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from './product.service'
import { ExchangeService } from './exchange.service'
import { ProductItem } from './product-item';
import { PRODUCT_ITEMS } from './product.data';

// var money = require('./money');
var fx = require('./money');
@Component({
  selector: 'product-search-root',
   templateUrl: './product-search.component.html',
})

export class ProductSearchComponent implements OnInit {
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
    onAddProd(form: FormGroup){
        // console.log(form);
        this._productService.searchData()
                .subscribe(
                    data => {
                            for (var i = 0; i < data.length; i++) { 

                            if(data[i].ISO4217_currency_alphabetic_code == this.listDataForm.controls['listDestinationCurrency'].value){

                                var country = data[i];
                                var range = this.listDataForm.controls['productRange'];
                                const productItem = new ProductItem(this.listDataForm.controls['product'].value, range.value, country.products[this.listDataForm.controls['product'].value][this.listDataForm.controls['productRange'].value].p);

                                this._productService.addProductItem(productItem);

                                var prodPrices:number[]=[];

                                for (var x of PRODUCT_ITEMS) { 
                                    prodPrices.push(Number(PRODUCT_ITEMS[i].price));
                                }
                                
                                this._exchangeService.getEx().subscribe(
                                        data => {
                                                  
                                            var totalCash = prodPrices.reduce((a, b) => a + b, 0);
                                            var baseCurrVal = data.rates[this.listDataForm.controls['listBaseCurrency'].value];
                                            var destCurrVal = data.rates[this.listDataForm.controls['listDestinationCurrency'].value];
                                            // var displayPrice = fx(totalCash).from(baseCurrVal).to(destCurrVal);
                                             var baseToDollar = totalCash/destCurrVal;
                                             var finalConv = baseToDollar*baseCurrVal;

                                            // console.log(this.listDataForm.controls['listBaseCurrency'].value);
                                            // console.log(this.listDataForm.controls['listDestinationCurrency'].value);
                                            
                                            // console.log(baseCurrVal);
                                            // console.log(destCurrVal);
                                            // console.log(finalConv);
                                             console.log(totalCash);
                                             console.log(finalConv);

                                             document.getElementById("totalBaseCash").innerHTML = totalCash.toFixed(2).toString();
                                             document.getElementById("totalCash").innerHTML = finalConv.toFixed(2).toString();
                                            
                                });                               
                            }
                        }
                    }
                );
    }
}