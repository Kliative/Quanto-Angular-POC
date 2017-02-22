import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { ProductItem } from "./product-item";
import { ProductSearchComponent } from "./product-search.component";
import { ProductBaseItem } from "./product-base-item";
import { ProductService } from "../services/product.service";

import { PRODUCT_BASE_ITEMS } from './product-base.data';
import { PRODUCT_ITEMS } from './product.data';


@Component({
    selector: 'product-list',
    template: `
        <section class="product-list">
            <product-item *ngFor="let productItem of productItems; let i=index" [item]="productItem" id="productItems"></product-item>
            <span (click)="onDeleteProfile($event, productBaseItem, productItem)" id="delete"><i class="fa fa-times-circle" aria-hidden="true"></i></span>
            <br>
            <product-base-item *ngFor="let productBaseItem of productBaseItems; let j=index" [items]="productBaseItem" id="productBaseItems"></product-base-item>
            
        </section>
    `,
   

})
export class ProductListComponent implements OnInit {
     public totalBaseCash: string;
     public totalCash: string;
     public totalBaseCountry: string;



    productItems: ProductItem[];
    productBaseItems: ProductBaseItem[];

    constructor(private _productService: ProductService, @Inject(forwardRef(() => ProductSearchComponent)) private _parent:ProductSearchComponent) {} 

    onDeleteProfile(event:Event, productBaseItem: ProductBaseItem, productItem: ProductItem) {
        event.stopPropagation();
        // console.log(productBaseItem);
        // console.log(productItem);
        this._productService.deleteProductItem(productItem, productBaseItem);


        var prodPrices:number[]=[];
        var prodPricesDest:number[]=[];

        for (var j = 0; j < PRODUCT_ITEMS.length; j++ ) { 
                prodPrices.push(Number(PRODUCT_ITEMS[j].price));
        }
        for (var i = 0; i < PRODUCT_BASE_ITEMS.length; i++ ) { 
                prodPricesDest.push(Number(PRODUCT_BASE_ITEMS[i].price));
        }
        document.getElementById("totalBaseCash").innerHTML = prodPrices.reduce((a, b) => a + b, 0).toFixed(2).toString();
        document.getElementById("totalBaseCountry").innerHTML = prodPricesDest.reduce((a, b) => a + b, 0).toFixed(2).toString();
        
        this._parent.reCalc();
        // console.log(prodPrices);
        // console.log(prodPricesDest);
    }

    ngOnInit():any {
        this.productItems = this._productService.getProductItems();
        this.productBaseItems = this._productService.getProductBaseItems();;
    }
}