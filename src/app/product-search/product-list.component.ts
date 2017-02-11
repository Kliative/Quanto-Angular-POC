import { Component, OnInit } from '@angular/core';
import { ProductItem } from "./product-item";
import { ProductBaseItem } from "./product-base-item";
import { ProductService } from "../services/product.service";
@Component({
    selector: 'product-list',
    template: `
        <section class="product-list">
            <product-item *ngFor="let productItem of productItems; let i=index" [item]="productItem" id="productItems"></product-item>
            <br>
            <product-base-item *ngFor="let productBaseItem of productBaseItems; let j=index" [items]="productBaseItem" id="productBaseItems"></product-base-item>
        </section>
    `,
   

})
export class ProductListComponent implements OnInit {
    
    productItems: ProductItem[];
    productBaseItems: ProductBaseItem[];

    constructor(private _productService: ProductService) {} 

    ngOnInit():any {
        this.productItems = this._productService.getProductItems();
        this.productBaseItems = this._productService.getProductBaseItems();;
    }
}