import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SelectModule } from 'ng2-select';

import { routes } from './app.routing';
import { AppComponent } from './app.component';
import {ProductListComponent} from "./product-search/product-list.component";
import {ProductItemComponent} from "./product-search/product-item.component";
import {ProductBaseItemComponent} from "./product-search/product-base-item.component";
import {ProductSearchComponent} from "./product-search/product-search.component";

import { ExchangeService } from './services/exchange.service'
import { ProductService } from './services/product.service';
import { ProductSendComponent } from './product-send/product-send.component';
import { QuantoComponent } from './quanto/quanto.component';
import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductBaseItemComponent,
    ProductSearchComponent,
    ProductSendComponent,
    QuantoComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    SelectModule,
    routes
  ],
  providers:[ProductService, ExchangeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
