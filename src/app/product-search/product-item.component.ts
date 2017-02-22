import { Component, Input, Inject, forwardRef } from '@angular/core';
import { ProductService } from "../services/product.service";

import { ProductItem } from "./product-item";
import { ProductSearchComponent } from "./product-search.component";
@Component({
    selector: 'product-item',
    template: `
        <article id="productItems" class="product-element" style="width:100%; position: relative; float:left;">
             <pre class="col-xs-4 col-sm-4 col-md-4 col-lg-4">{{productItem.product}}</pre>
             <pre class="col-xs-4 col-sm-4 col-md-4 col-lg-4"> <span (click)="remove($event, productBaseItem)" ><i class="fa fa-minus-circle" aria-hidden="true"></i></span> {{productItem.quantity}} <span (click)="add($event, productBaseItem)" ><i class="fa fa-plus-circle" aria-hidden="true"></i></span></pre>
             <pre id="prodAmount" class="col-xs-4 col-sm-4 col-md-4 col-lg-4">{{productItem.price}}</pre>
        </article>
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