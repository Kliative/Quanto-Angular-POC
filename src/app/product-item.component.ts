import { Component, Input } from '@angular/core';
import { ProductItem } from "./product-item";
@Component({
    selector: 'product-item',
    template: `
        <article class="product-element" style="width:100%; position: relative; float:left;">
             <pre class="col-sx-3 col-sm-3 col-md-3 col-lg-3">{{productItem.product}}</pre>
             <pre class="col-sx-3 col-sm-3 col-md-3 col-lg-3">{{productItem.range }}</pre>
             <pre class="col-sx-3 col-sm-3 col-md-3 col-lg-3">{{productItem.range }}</pre>
             <pre id="prodAmount" class="col-sx-3 col-sm-3 col-md-3 col-lg-3">{{productItem.price}}</pre>
        </article>
    `
    

})
export class ProductItemComponent {
    @Input('item') productItem:ProductItem;
}