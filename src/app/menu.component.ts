import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],

})
export class MenuComponent implements OnInit {
  name: any;
  state: string = '';
  constructor(public af: AngularFire,private router: Router) {

    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
      }
    });

   }

  ngOnInit() {
  }
  closeBtn(){
    document.getElementById("mySidenav").style.width = "0";
  }
  openBtn(){
    document.getElementById("mySidenav").style.width = "100%";
  }
  logout() {
     this.af.auth.logout();
     console.log('logged out');
     document.getElementById("mySidenav").style.width = "0";
     this.router.navigateByUrl('/login');
  }

}
 