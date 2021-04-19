import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


 

  @Output() navToggle = new EventEmitter(); //ต้องการส่ง output ไปหาตัวแม่ //ส่ง void
  @Output() sayHi = new EventEmitter <string>()
  

  demoMailNoti = 50;
  demoNoti = 9;

  constructor() { }

  ngOnInit(): void {
  }

  onClickNavtoggle(){
    this.navToggle.emit();
    this.sayHi.emit("chay");

  }



}
