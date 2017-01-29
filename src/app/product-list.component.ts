import { Component, OnInit } from '@angular/core';
import { ProductItem } from "./product-item";
import { ProductService } from "./product.service";
@Component({
    selector: 'product-list',
    template: `
        <section class="product-list">
            <product-item *ngFor="let productItem of productItems; let i=index" [item]="productItem"></product-item>
        </section>
    `,
   

})
export class ProductListComponent implements OnInit {
    productItems: ProductItem[];
    
    constructor(private _productService: ProductService) {}

    ngOnInit():any {
        this.productItems = this._productService.getProductItems();
        // this.ProductItems = PRODUCT_ITEMS;
    }
}