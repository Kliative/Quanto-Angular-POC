import { Component, Input } from '@angular/core';
import { ProductItem } from "./product-item";
@Component({
    selector: 'product-item',
    template: `
        <article id="productItems" class="product-element" style="width:100%; position: relative; float:left;">
             <pre class="col-xs-4 col-sm-4 col-md-4 col-lg-4">{{productItem.product}}</pre>
             <pre class="col-xs-4 col-sm-4 col-md-4 col-lg-4">{{productItem.range}}</pre>
             <pre id="prodAmount" class="col-xs-4 col-sm-4 col-md-4 col-lg-4">{{productItem.price}}</pre>
        </article>
    `
})
export class ProductItemComponent {
     @Input('item') productItem:ProductItem;
}