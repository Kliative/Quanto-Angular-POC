import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpService} from '../services/http.service';
import { ProductService } from '../services/product.service'
@Component({
  selector: 'product-send',
  templateUrl: './product-send.component.html',
  styleUrls: ['./product-send.component.css'],
  providers: [HttpService]
})
export class ProductSendComponent implements OnInit {
  public date;
  constructor(private _fb: FormBuilder, private httpService: HttpService, private _productService: ProductService) { }
  public sendDataForm: FormGroup;

  onSend(sendDataForm: FormData){
        this.httpService.sendData(sendDataForm)
        .subscribe(
            data => console.log(data)
        );
    }

   public countries = [];
  ngOnInit() {

    this.date = new Date();
        this.sendDataForm = this._fb.group({
            product: '',
            price: '',
            range: '',
            location: '',
            timeStamp: this.date
        });
      this.populateDropD();
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
}
