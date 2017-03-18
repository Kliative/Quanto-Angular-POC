import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service'
import { ExchangeService } from '../services/exchange.service'
import { MarkerService } from '../services/marker.service';

@Component({
  selector: 'app-quanto',
  templateUrl: './quanto.component.html',
  styleUrls: ['./quanto.component.css'],
  providers:[MarkerService]
})

export class QuantoComponent implements OnInit {

  public quantoForm: FormGroup;

  public v1: number;
  public v2: number;

  public baseCurCon: number;


  //GMaps
    //Zoom Level
  zoom: number = 15;
  // research current location
  // Start Position
  // lat: number = -26.01428;
  // lng: number = 28.14738;
  public loginForm: FormGroup;
  lat: number;
  lng: number;
  // Values
  markerName:string;
  markerLat:string;
  markerLng:string;
  markerDraggable:string;


  inputSearchMarkers: marker[] = [];
   markers: marker[] = [];
  constructor(private _fb:FormBuilder, private _productService: ProductService, private _exchangeService: ExchangeService,private _markerService:MarkerService) {
    // navigator.geolocation.watchPosition((position) =>{
    //   this.lat = position.coords.latitude;
    //   this.lng = position.coords.longitude;
    // });

    this.lat = -25.9355700;
    this.lng = 28.1270430;

   }
// 
     public productItems:Array<any> = [
         {id: 'Meal', text: 'Meal at Restaurant'},
         {id: 'McMeal', text: 'McMeal at McDonalds'},
         {id: 'DomBeer', text: 'Domestic Beer'},
         {id: 'ImpBeer', text: 'Imported Beer'},
         {id: 'Coke', text: 'Soft Drink (Can)'},
         {id: 'WineBottle', text: 'Wine Bottle'},
         {id: 'PackSmokes', text: 'Cigarettes (20 box)'},
         {id: 'OneWayTicket', text: 'One Way Travel Ticket'},
         {id: 'MovieTicket', text: 'Movie Ticket (1 person)'},
     ];
 
  private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = false;
 
  private get disabledV():string {
    return this._disabledV;
  }
 
  private set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }
 
  public selected(value:any):void {
    
    this.quantoForm.patchValue({product: value.id});
  }
 
  public removed(value:any):void {
    console.log('Removed value is: ', value);
  }
 
  public typed(value:any):void {
    console.log('New search input: ', value);
  }
 
  public refreshValue(value:any):void {
    this.value = value.id;
  }

  public countries = [];
  quantoSearchSection:boolean = false;
  quantoSection:boolean = false;
  quantoFindSection:boolean = false;
  
  ngOnInit() {

      this.quantoForm = this._fb.group({
            product: '',
            baseCurrency: '',
            destinationCurrency: ''
        });
      this.loginForm = this._fb.group({
            keyword: ''
      });
      this.loadSearch();
      this.populateDropD();
  }
  searchRes() {
    // console.log(event);
    // console.log(this.loginForm.controls['keyword'].value);
    this.removeMaker();
    this._markerService.inputResult(this.lat,this.lng,this.loginForm.controls['keyword'].value)
              .subscribe(
                  data => {
                    
                    for (var i in data) {
                      var loc = data[i];
                        if(data[i]==loc){
                          for (var i in loc) {
                            if(loc[i].geometry){
                              console.log(loc[i].geometry.location);

                              // this.markers = loc[i].geometry.location;
                              var searchLoc = {
                                name: loc[i].name,
                                lat: parseFloat(loc[i].geometry.location.lat),
                                lng: parseFloat(loc[i].geometry.location.lng),
                                draggable:false
                              }
                              this.inputSearchMarkers.push(searchLoc);
                            }
                        }
                      }
                    }
                  });
  }
  // Shop example 
  loadSearch(){
    this._markerService.getSearch(this.lat,this.lng)
              .subscribe(
                  data => {
                    
                    for (var i in data) {
                      var loc = data[i];
                        if(data[i]==loc){
                          for (var i in loc) {
                            if(loc[i].geometry){
                              // console.log(loc[i].geometry.location);

                              // this.markers = loc[i].geometry.location;
                              var searchLoc = {
                                name: loc[i].name,
                                lat: parseFloat(loc[i].geometry.location.lat),
                                lng: parseFloat(loc[i].geometry.location.lng),
                                draggable:false
                              }
                              this.markers.push(searchLoc);
                            }
                        }
                      }
                    }
                  });
  }
  removeMaker(){
    console.log('removeMaker');
    for(var i=0;i<this.inputSearchMarkers.length;i++){
      this.inputSearchMarkers.splice(0,this.inputSearchMarkers.length);
    }
  }
  // Toggle Views
  toggleViews(){
        if(this.quantoSection == false){
            this.quantoSection = true;
            this.quantoSearchSection = true;
        } else {
            this.quantoSection = false;
            this.quantoSearchSection = false;
        }
    }
  toggleFinder(){
      if(this.quantoFindSection == false){
            this.quantoFindSection = true;
            this.quantoSection = false;
            this.quantoSearchSection = true;
        } else {
            this.quantoFindSection = false;
            this.quantoSection = true;
        }
  }
  populateDropD(){
       this._productService.searchData()
              .retry()
              .subscribe(
                  data => {
                    for (var i = 0; i < data.length; i++) { 

                        var countryListData = data[i];
                        var countryName = countryListData.name;
                        var countryCurrencyCode = countryListData.ISO4217_currency_alphabetic_code;
                        
                        this.countries.push({value: countryCurrencyCode,display:countryName});
                    }

                  });
  }
  quantoClick(form: FormGroup){
      this._productService.searchData()
              .retry()
              .subscribe(
                  data => {
                       
                          for (var i = 0; i < data.length; i++) { 
                              if(data[i].ISO4217_currency_alphabetic_code == this.quantoForm.controls['baseCurrency'].value){
                              
                                var baseCom = data[i].products[this.quantoForm.controls['product'].value]['norm']['p'];
                                
                                document.getElementById("basePriceTxt").innerHTML = baseCom;
                                document.getElementById("baseCoName").innerHTML = data[i].name;
                                
                                document.getElementById("baseCurrSymbol").innerHTML = data[i].ISO4217_currency_symbol;
                                document.getElementById("baseCurrSymbolDetail").innerHTML = data[i].ISO4217_currency_symbol;

                                this._exchangeService.getEx().retry().subscribe(
                                        data => {
                                                
                                            var baseCurrVal = data.rates[this.quantoForm.controls['baseCurrency'].value];
                                            var destCurrVal = data.rates[this.quantoForm.controls['destinationCurrency'].value];

                                            var baseToDollar = 1/destCurrVal;
                                            var finalConv = baseToDollar*baseCurrVal;
                                            this.baseCurCon = finalConv;

                                            // document.getElementById("destVbasTxt").innerHTML = finalConv.toFixed(5);
                                            this.v2 = Number(baseCom);
                                            // console.log("v2 "+this.v2);
                                });
                            
                              }
                              if(data[i].ISO4217_currency_alphabetic_code == this.quantoForm.controls['destinationCurrency'].value){
                              
                                var destCom = data[i].products[this.quantoForm.controls['product'].value]['norm']['p'];

                                var destComLow = data[i].products[this.quantoForm.controls['product'].value]['norm']['l'];
                                var destComHigh = data[i].products[this.quantoForm.controls['product'].value]['norm']['h'];
                                                                
                                document.getElementById("destPriceLowTxt").innerHTML = destComLow;
                                document.getElementById("destPriceHighTxt").innerHTML = destComHigh;

                                document.getElementById("destPriceTxt").innerHTML = destCom;
                                document.getElementById("destPriceTxtEX").innerHTML = destCom;
                                document.getElementById("destCoName").innerHTML = data[i].name;
                                
                                // Currency Symbol
                                var destCurrSymbol = data[i].ISO4217_currency_symbol;
                                document.getElementById("destCurrSymbol").innerHTML = destCurrSymbol;
                                document.getElementById("destPriceHighCurrSymbol").innerHTML = destCurrSymbol;
                                document.getElementById("destPriceLowCurrSymbol").innerHTML = destCurrSymbol;

                                this._exchangeService.getEx().retry().subscribe(
                                        data => {
                                                  
                                            var baseCurrVal = data.rates[this.quantoForm.controls['baseCurrency'].value];
                                            var destCurrVal = data.rates[this.quantoForm.controls['destinationCurrency'].value];

                                            var baseToDollar = 1/baseCurrVal;
                                            var finalConv = baseToDollar*destCurrVal;

                                            // document.getElementById("basVdestTxt").innerHTML = finalConv.toFixed(5);
                                            
                                            this.v1 = Number((destCom*this.baseCurCon).toFixed(2));

                                            document.getElementById("basePricePlusExhange").innerHTML = this.v1.toString();

                                            // console.log("destCom "+destCom);
                                            // console.log("finalConv "+this.baseCurCon);
                                            // console.log("v1 "+this.v1);

                                            var diffPercent = ((this.v2 / this.v1) * 100).toFixed(2);
                                            var numDestCom = Number(destCom);
                                            var priceDiff = this.v1 - this.v2;
                                            var numPriceDiff = priceDiff.toFixed(2);

                                            // console.log("PriceDiff ="+priceDiff);
                                            // console.log(diffPercent+"% Diff");

                                            // if(Number(diffPercent)>100){
                                            //     document.getElementById("finalCalcPer").innerHTML = diffPercent+" % less expensive";
                                            // } else {
                                            //     document.getElementById("finalCalcPer").innerHTML = diffPercent+" % more expensive";
                                            // }
                                            
                                            if(priceDiff<0){
                                                document.getElementById("finalCalcCash").innerHTML = Math.abs(Number(numPriceDiff))+"";
                                                document.getElementById("finalCalcCash-descrip").innerHTML = "less expensive";
                                                document.getElementById("result-difference-circle").className =  "DC-green";
                                                document.getElementById("result-icon").innerHTML =  '<i class="fa fa-smile-o" aria-hidden="true"></i>';
                                            }else{
                                                document.getElementById("finalCalcCash").innerHTML = priceDiff.toFixed(2)+"";
                                                document.getElementById("finalCalcCash-descrip").innerHTML = "more expensive";
                                                document.getElementById("result-difference-circle").className =  "DC-red";
                                                document.getElementById("result-icon").innerHTML =  '<i class="fa fa-frown-o" aria-hidden="true"></i>';
                                            } 

                                });
                            
                              }
                            }

                                           
                                            
                                            
                          }
                      );
  }
}
    // Marker 
    interface marker {
      name?:string;
      lat:number;
      lng:number;
      draggable:boolean;
    }
