import { Component, Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database'
import {Observable} from 'rxjs'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public status_good : number 
  public status_bad : number 
  public status_down : number 


  items  : Observable <any>

  public node1List: Node1[];

  public id : number;
  public A : string;
  public S: string;
  public V : string;

  constructor(private  db: AngularFireDatabase) { 
    this.getDataFromRealtime();
  }

  ngOnInit(): void {
  }

  async getStarted(){
    var node1: Node1[];
    await this.getUserFreomRealtimDB().then(value => {
      node1 = value as Node1[];
    })
  this.node1List = node1;
   console.log(this.node1List)
   //this._id = this._usersList[this._usersList.length -1].id+1

  }

  getUserFreomRealtimDB(){
    return new Promise((resove,reject)=>{
      this.db.list('node1').valueChanges().subscribe(value => {
        resove(value);
      });
    });
  }

  getDataFromRealtime(){
    this.db.list('node1').snapshotChanges().forEach(datasSnapshot=>{
      this.node1List = [];
       datasSnapshot.forEach(dataSnapshot=>{
        let data = dataSnapshot.payload.toJSON();
        this.node1List.push(data as Node1)
      })
      //this.id = this.node1List[this.node1List.length].id + 1
      console.log(this.node1List)
      const result_ok = this.node1List.filter( data =>{
        return data.S == "OK"
      })

      const result_bad = this.node1List.filter( data =>{
        return data.S == "BAD"
      })

      const result_down = this.node1List.filter( data =>{
        return data.S == "DOWN"
      })      
      this.status_good = result_ok.length;
      this.status_bad = result_bad.length;
      this.status_down = result_down.length; 
      
      
    })
  }

  checkGoodStatus(){
 
  }

  

}

class Node1{
  id : number;
  A : string;
  S: string;
  V : string;
}

