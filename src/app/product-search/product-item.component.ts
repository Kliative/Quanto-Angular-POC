import { Component, Input, Inject, forwardRef } from '@angular/core';
import { ProductService } from "../services/product.service";

import { ProductItem } from "./product-item";
import { ProductSearchComponent } from "./product-search.component";
@Component({
    selector: 'product-item',
    template: `
        <!-- <article id="productItems" class="product-element" style="width:100%; position: relative; float:left;">
             <pre class="col-xs-4 col-sm-4 col-md-4 col-lg-4">{{productItem.product}}</pre>
             <pre class="col-xs-4 col-sm-4 col-md-4 col-lg-4"> <span (click)="remove($event, productBaseItem)" ><i class="fa fa-minus-circle" aria-hidden="true"></i></span> {{productItem.quantity}} <span (click)="add($event, productBaseItem)" ><i class="fa fa-plus-circle" aria-hidden="true"></i></span></pre>
             <pre id="prodAmount" class="col-xs-4 col-sm-4 col-md-4 col-lg-4">{{productItem.price}}</pre>
        </article> -->


        <div id="productItems" class="product-cell product-element">
            <div class="col-xs-4 col-sm-4 product-text">
                    {{productItem.product}}
            </div>
            <div class="col-xs-2 col-sm-2 range-text">
                    <span class="product-range">
                        <!--<i class="fa fa-cutlery" aria-hidden="true"></i>-->
                        <i class="fa fa-bed" aria-hidden="true"></i>
                        <!--<i class="fa fa-shopping-basket" aria-hidden="true"></i>-->
                    </span>
            </div>
            <div class="col-xs-3 col-sm-3 quantity-text">
                 <span (click)="remove($event, productBaseItem)" ><i class="fa fa-minus-circle" aria-hidden="true"></i></span> {{productItem.quantity}} <span (click)="add($event, productBaseItem)" ><i class="fa fa-plus-circle" aria-hidden="true"></i></span>
            </div> 
            <div class="col-xs-3 col-sm-3">
                <span class="currSymbol-list">£</span>{{productItem.price}}
            </div>    
        </div> 
    `
})
export class ProductItemComponent {
     @Input('item') productItem:ProductItem;

     constructor (private _productService: ProductService, @Inject(forwardRef(() => ProductSearchComponent)) private _parent:ProductSearchComponent){}

     remove(event:Event, productItem: ProductItem){
         event.stopPropagation();
         this._productService.removeFromList(this.productItem, this._parent.listDataForm.controls['listBaseCurrency'].value , this._parent.listDataForm.controls['listDestinationCurrency'].value , this._parent.listDataForm.controls['product'].value, this._parent.listDataForm.controls['productRange'].value  );
         this._parent.reCalc();
         
     }
     add(event:Event, productItem: ProductItem){
        event.stopPropagation();
         this._productService.addToList(this.productItem, this._parent.listDataForm.controls['listBaseCurrency'].value , this._parent.listDataForm.controls['listDestinationCurrency'].value , this._parent.listDataForm.controls['product'].value, this._parent.listDataForm.controls['productRange'].value  );
         this._parent.reCalc();


     }
}