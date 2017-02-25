import { Component, Input } from '@angular/core';
import { ProductBaseItem } from "./product-base-item";
import { ProductService } from '../services/product.service';
@Component({
    selector: 'product-base-item',
    template: `
       <!-- <article id="productBaseItemsRow" class="product-element" style="width:100%; position: relative; float:left;">
             <pre class="col-xs-4 col-sm-4 col-md-4 col-lg-4">{{productBaseItem.product}}</pre>
             <pre class="col-xs-4 col-sm-4 col-md-4 col-lg-4"> {{productBaseItem.quantity}} </pre>
             <pre id="prodAmount" class="col-xs-4 col-sm-4 col-md-4 col-lg-4">{{productBaseItem.price}}</pre>
        </article> -->

        <div id="productItems" class="product-cell product-element">
            <div class="col-xs-4 col-sm-4 product-text">
                    {{productBaseItem.product}}
            </div>
            <div class="col-xs-2 col-sm-2 range-text">
                    <span class="product-range">
                        <!--<i class="fa fa-cutlery" aria-hidden="true"></i>-->
                        <i class="fa fa-bed" aria-hidden="true"></i>
                        <!--<i class="fa fa-shopping-basket" aria-hidden="true"></i>-->
                    </span>
            </div>
            <div class="col-xs-3 col-sm-3 quantity-text">
                  {{productBaseItem.quantity}} 
            </div> 
            <div class="col-xs-3 col-sm-3">
                <span class="currSymbol-list">£</span>{{productBaseItem.price}}
            </div>    
        </div>
    `
})
export class ProductBaseItemComponent {
     @Input('items') productBaseItem:ProductBaseItem;

     constructor(private _productService: ProductService,){}

     
}