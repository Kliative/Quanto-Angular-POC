import { Component, Input } from '@angular/core';
import { ProductBaseItem } from "./product-base-item";
import { ProductService } from '../services/product.service';
@Component({
    selector: 'product-base-item',
    template: `
        <div id="productItems" class="product-cell product-element">
            <div class="col-xs-4 col-sm-4 product-text">
                    {{productBaseItem.product}}
            </div>
            <div class="col-xs-2 col-sm-2 range-text">
                    <span class="product-range">
                        <i *ngIf="productBaseItem.range == 'low'" class="fa fa-cutlery" aria-hidden="true"></i>
                        <i *ngIf="productBaseItem.range == 'norm'" class="fa fa-bed" aria-hidden="true"></i>
                        <i *ngIf="productBaseItem.range == 'high'" class="fa fa-shopping-basket" aria-hidden="true"></i>
                    </span>
            </div>
            <div class="col-xs-3 col-sm-3 quantity-text">
                  {{productBaseItem.quantity}} 
            </div> 
            <div  class="col-xs-3 col-sm-3">
                {{productBaseItem.price}}
            </div>    
        </div>
    `
})
export class ProductBaseItemComponent {
     @Input('items') productBaseItem:ProductBaseItem;

     constructor(private _productService: ProductService,){}

     
}