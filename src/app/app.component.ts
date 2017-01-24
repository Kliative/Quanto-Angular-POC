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

  public myForm: FormGroup;
  public sendDataForm: FormGroup;

    public submitted: boolean;
    public events: any[] = [];

    constructor(private _fb: FormBuilder, private _sFb:FormBuilder, private httpService: HttpService) { }
    
    ngOnInit() {
        this.date = new Date();
        this.httpService.getData()
            .subscribe(
                (data:any) => console.log(data)
            );

        this.sendDataForm = this._sFb.group({
            product: '',
            price: '',
            range: '',
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

    save(model: User, isValid: boolean) {
        this.submitted = true;
        console.log(model, isValid);
    }
}
