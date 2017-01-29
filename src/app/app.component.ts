import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from './user.interface';
import { HttpService} from './http.service';

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
  public sendDataForm: FormGroup;


    public submitted: boolean;
    public events: any[] = [];

    constructor(private _fb: FormBuilder, private _sFb:FormBuilder, private httpService: HttpService) {
        this.httpService.getCurrentLocation()
            .subscribe(
                (data:any) => {
                    this.city = data.city;
                    
                }
            );
     }
        
    ngOnInit() {
        this.date = new Date();
        console.log(this.city);
        
        this.sendDataForm = this._sFb.group({
            product: '',
            price: '',
            range: '',
            location: '',
            timeStamp: this.date
        });
        this.myForm = this._fb.group({
            product: '',
            baseCurrency: '',
            destinationCurrency: ''
        });

    }
    onSend(sendDataForm: FormData){
        this.httpService.sendData(sendDataForm)
        .subscribe(
            data => console.log(data)
        );
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
