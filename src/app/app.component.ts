import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from './user.interface';
import { HttpService} from './services/http.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./css/app.component.css'],
  providers: [HttpService]
})
export class AppComponent implements OnInit {
    items: any[];
    public date;
    asyncString = this.httpService.getData();
    public city;
  
  public myForm: FormGroup;
  


    public submitted: boolean;
    public events: any[] = [];

    constructor(private _fb: FormBuilder, private httpService: HttpService) {}
        
    ngOnInit() {
        
        this.myForm = this._fb.group({
            product: '',
            baseCurrency: '',
            destinationCurrency: ''
        });

    }
    
    onGetData(){
        this.httpService.getOwnData()
        .subscribe(
            data => {
                const myArray = [];
                for (let key in data){
                    myArray.push(data[key]);
                }
                this.items = myArray;
            }
        );
    }
    onAddProd(){
        
    }

    save(model: User, isValid: boolean) {
        this.submitted = true;
        console.log(model, isValid);
    }
}
