import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {ProductListComponent} from "./product-list.component";
import {ProductItemComponent} from "./product-item.component";
import {ProductBaseItemComponent} from "./product-base-item.component";
import {ProductSearchComponent} from "./product-search.component";

import { ExchangeService } from './exchange.service'
import { ProductService } from './product.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductBaseItemComponent,
    ProductSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers:[ProductService, ExchangeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
