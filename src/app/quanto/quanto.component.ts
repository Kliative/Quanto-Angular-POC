import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service'
import { ExchangeService } from '../services/exchange.service'

@Component({
  selector: 'app-quanto',
  templateUrl: './quanto.component.html',
  styleUrls: ['./quanto.component.css']
})

export class QuantoComponent implements OnInit {

  public quantoForm: FormGroup;


  public v1: number;
  public v2: number;

  public baseCurCon: number;

  constructor(private _fb:FormBuilder, private _productService: ProductService, private _exchangeService: ExchangeService) { }

  ngOnInit() {

      this.quantoForm = this._fb.group({
            product: '',
            baseCurrency: '',
            destinationCurrency: ''
        });

  }
  quantoClick(form: FormGroup){
      this._productService.searchData()
              .subscribe(
                  data => {
                          for (var i = 0; i < data.length; i++) { 
                              if(data[i].ISO4217_currency_alphabetic_code == this.quantoForm.controls['baseCurrency'].value){
                              
                                var baseCom = data[i].products[this.quantoForm.controls['product'].value]['norm']['p'];
                                
                                document.getElementById("basePriceTxt").innerHTML = baseCom;
                                document.getElementById("baseCoName").innerHTML = data[i].name;

                                this._exchangeService.getEx().subscribe(
                                        data => {
                                                
                                            var baseCurrVal = data.rates[this.quantoForm.controls['baseCurrency'].value];
                                            var destCurrVal = data.rates[this.quantoForm.controls['destinationCurrency'].value];

                                            var baseToDollar = 1/destCurrVal;
                                            var finalConv = baseToDollar*baseCurrVal;
                                            this.baseCurCon = finalConv;

                                            document.getElementById("destVbasTxt").innerHTML = finalConv.toFixed(5);
                                            this.v2 = Number(baseCom);
                                            // console.log("v2 "+this.v2);
                                });
                            
                              }
                              if(data[i].ISO4217_currency_alphabetic_code == this.quantoForm.controls['destinationCurrency'].value){
                              
                                var destCom = data[i].products[this.quantoForm.controls['product'].value]['norm']['p'];
                                
                                document.getElementById("destPriceTxt").innerHTML = destCom;
                                document.getElementById("destPriceTxtEX").innerHTML = destCom;
                                document.getElementById("destCoName").innerHTML = data[i].name;

                                this._exchangeService.getEx().subscribe(
                                        data => {
                                                  
                                            var baseCurrVal = data.rates[this.quantoForm.controls['baseCurrency'].value];
                                            var destCurrVal = data.rates[this.quantoForm.controls['destinationCurrency'].value];

                                            var baseToDollar = 1/baseCurrVal;
                                            var finalConv = baseToDollar*destCurrVal;

                                            document.getElementById("basVdestTxt").innerHTML = finalConv.toFixed(5);
                                            
                                            this.v1 = Number((destCom*this.baseCurCon).toFixed(2));

                                            document.getElementById("basePricePlusExhange").innerHTML = this.v1.toString();

                                            // console.log("destCom "+destCom);
                                            // console.log("finalConv "+this.baseCurCon);
                                            // console.log("v1 "+this.v1);

                                            var diffPercent = ((this.v2 / this.v1) * 100).toFixed(2);
                                            var numDestCom = Number(destCom);
                                            var priceDiff = this.v1 - this.v2;
                                            var numPriceDiff = priceDiff.toFixed(2);

                                            // console.log("PriceDiff ="+priceDiff);
                                            // console.log(diffPercent+"% Diff");

                                            if(Number(diffPercent)>100){
                                                document.getElementById("finalCalcPer").innerHTML = diffPercent+" % less expensive";
                                            } else {
                                                document.getElementById("finalCalcPer").innerHTML = diffPercent+" % more expensive";
                                            }
                                            if(priceDiff<0){
                                                document.getElementById("finalCalcCash").innerHTML = Math.abs(Number(numPriceDiff))+" less expensive";
                                            }else{
                                                document.getElementById("finalCalcCash").innerHTML = priceDiff.toFixed(2)+" more expensive";
                                            } 
                                });
                            
                              }
                            }

                                           
                                            
                                            
                          }
                      );
  }
}
