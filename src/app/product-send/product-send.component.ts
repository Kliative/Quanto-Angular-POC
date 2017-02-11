import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpService} from '../services/http.service';
@Component({
  selector: 'product-send',
  templateUrl: './product-send.component.html',
  styleUrls: ['./product-send.component.css'],
  providers: [HttpService]
})
export class ProductSendComponent implements OnInit {
  public date;
  constructor(private _fb: FormBuilder, private httpService: HttpService) { }
  public sendDataForm: FormGroup;

  onSend(sendDataForm: FormData){
        this.httpService.sendData(sendDataForm)
        .subscribe(
            data => console.log(data)
        );
    }

  
  ngOnInit() {

    this.date = new Date();
        this.sendDataForm = this._fb.group({
            product: '',
            price: '',
            range: '',
            location: '',
            timeStamp: this.date
        });
  }

}
