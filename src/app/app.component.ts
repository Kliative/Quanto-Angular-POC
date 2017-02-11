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
    


    constructor( private httpService: HttpService) {}
        
    ngOnInit() {
        
        

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
}
