import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  closeBtn(){
    document.getElementById("mySidenav").style.width = "0";
  }
  openBtn(){
    document.getElementById("mySidenav").style.width = "100%";
  }
}
