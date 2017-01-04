import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from './user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./css/app.component.css']
})
export class AppComponent {
  public myForm: FormGroup;
    public submitted: boolean;
    public events: any[] = [];

    constructor(private _fb: FormBuilder) { }

    ngOnInit() {
        
        this.myForm = this._fb.group({
            product: '',
            baseCurrency: '',
            destinationCurrency: ''
        });

    }

    save(model: User, isValid: boolean) {
        this.submitted = true;
        console.log(model, isValid);
    }
}
