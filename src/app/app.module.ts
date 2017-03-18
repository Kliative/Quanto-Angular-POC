import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SelectModule } from 'ng2-select';

import { AngularFireModule } from 'angularfire2';

import { routes } from './app.routing';
import { AppComponent } from './app.component';
import {ProductListComponent} from "./product-search/product-list.component";
import {ProductItemComponent} from "./product-search/product-item.component";
import {ProductBaseItemComponent} from "./product-search/product-base-item.component";
import {ProductSearchComponent} from "./product-search/product-search.component";

import { ExchangeService } from './services/exchange.service'
import { ProductService } from './services/product.service';
import { AuthGuard } from './services/auth.service';

import { ProductSendComponent } from './product-send/product-send.component';
import { QuantoComponent } from './quanto/quanto.component';
import { MenuComponent } from './menu.component';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';
import { MembersComponent } from './members/members.component';

// Gmaps
import { AgmCoreModule } from 'angular2-google-maps/core';

export const firebaseConfig = {
    apiKey: "AIzaSyCu-KybJpSOTL9U5kfR_egxByJ7cmAIGiI",
    authDomain: "quantotest-8a1ec.firebaseapp.com",
    databaseURL: "https://quantotest-8a1ec.firebaseio.com",
    storageBucket: "quantotest-8a1ec.appspot.com",
    messagingSenderId: "961289292492"
};

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductBaseItemComponent,
    ProductSearchComponent,
    ProductSendComponent,
    QuantoComponent,
    MenuComponent,
    LoginComponent,
    EmailComponent,
    SignupComponent,
    MembersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    SelectModule,
    routes,
    AngularFireModule.initializeApp(firebaseConfig),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAbtMkAg1fagf0fV2bHY2FGn7yYm1-JrTI'
    })
  ],
  providers:[ProductService, ExchangeService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
