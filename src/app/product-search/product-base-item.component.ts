import { Component, Input } from '@angular/core';
import { ProductBaseItem } from "./product-base-item";
@Component({
    selector: 'product-base-item',
    template: `
        <article id="productBaseItemsRow" class="product-element" style="width:100%; position: relative; float:left;">
             <pre class="col-sx-4 col-sm-4 col-md-4 col-lg-4">{{productBaseItem.product}}</pre>
             <pre class="col-sx-4 col-sm-4 col-md-4 col-lg-4">{{productBaseItem.range}}</pre>
             <pre id="prodAmount" class="col-sx-4 col-sm-4 col-md-4 col-lg-4">{{productBaseItem.price}}</pre>
        </article>
    `
})
export class ProductBaseItemComponent {
     @Input('items') productBaseItem:ProductBaseItem;
}