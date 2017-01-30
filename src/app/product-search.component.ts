import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from './product.service'
import { ProductItem } from './product-item';
@Component({
  selector: 'product-search-root',
  template: `
       <form [formGroup]="listDataForm" novalidate (ngSubmit)="save(listDataForm.value, listDataForm.valid)">

  
            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 ">
                <div class="well wellColor animated fadeIn"> 
                <div class="row">
                    
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <select class="form-control" id="listBaseCurSel" formControlName="listBaseCurrency">
                            <option value="">Select Base Currency...</option>
                            <option id="listCurrentLocOpt"></option>
                        </select>
                        <!--<br>-->
                        <!--<label>Your current location is:</label> <i id="userLoc"></i>-->
                        </div>
                </div>
                <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <select class="form-control" id="listDestCurSel" formControlName="listDestinationCurrency"> 
                            <option value="">Select Destination Currency...</option>
                            
                        </select>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <!--<input type="text" class="form-control" id="product" #product>-->
                            <div class="row">
                                <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                <select class="form-control" id="sDProdSel" formControlName="product" #product>
                                            <option value="">Select Product...</option>
                                            <option value="McMeal">McMeal at McDonalds</option>
                                            <option value="DomBeer">Domestic Beer</option>
                                            <option value="ImpBeer">Imported Beer</option>
                                            <option value="Coke">Coke</option>
                                            <option value="WineBottle">Wine Bottle</option>
                                            <option value="PackSmokes">Pack Smokes</option>
                                            <option value="OneWayTicket">One Way Travel Ticket</option>
                                            <option value="MovieTicket">Movie Tickt (1 person)</option>
                                </select>
                                </div>
                                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                                <button class="btn btn-success" type="button" (click)="onAddProd(listDataForm.value)">Add</button>
                                </div>
                            </div>
                            <hr>
                            <!--<span *ngFor="#weatherItem of weatherItems">-->
                                <!--<pre class="col-sx-4 col-sm-4 col-md-4 col-lg-4">Product Name</pre>
                                <pre class="col-sx-4 col-sm-4 col-md-4 col-lg-4">Amount</pre>
                                <pre class="col-sx-4 col-sm-4 col-md-4 col-lg-4">Currency + Cash</pre>-->
                            <!--</span>-->
                            <product-list></product-list>
                            <hr>
                            
                                <pre class="col-sx-4 col-sm-4 col-md-4 col-lg-4">Total Products</pre>
                                <pre class="col-sx-4 col-sm-4 col-md-4 col-lg-4">Currency</pre>
                                <pre class="col-sx-4 col-sm-4 col-md-4 col-lg-4">Total Cash</pre>
                        </div>
                    </div>
                </div>
            </div>   

        </form>

        <div class="margin-20">
            <pre>myForm value: <br>{{listDataForm.value | json}}</pre>
        </div>
    `,

})

export class ProductSearchComponent implements OnInit {
     public listDataForm: FormGroup;

     constructor (private _sFb:FormBuilder, private _productService: ProductService){}
ngOnInit() {
        
        this.listDataForm = this._sFb.group({
            product: '',
            listBaseCurrency: '',
            listDestinationCurrency: ''
            
        });
}
onAddProd(form: FormGroup){
    console.log(form);
    this._productService.searchData()
            .subscribe(
                data => {

                    // for (var item of data) {
                        for (var i = 0; i < data.length; i++) { 
                        // console.log(data[i]);
                           

                        if(data[i].ISO4217_currency_alphabetic_code ==  this.listDataForm.controls['listDestinationCurrency'].value){

                            var country = data[i];
                           
                            const productItem = new ProductItem(this.listDataForm.controls['product'].value, country.products[this.listDataForm.controls['product'].value]);

                            this._productService.addProductItem(productItem);
                        }
                    }
                    
                }
                // data => console.log(data)
    );
}
}