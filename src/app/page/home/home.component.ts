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
  public status_broken : number 


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
        return data.S == "Down"
      })      

      const result_broken = this.node1List.filter( data =>{
        return data.A == "0.00"
      })   

      this.status_good = result_ok.length;
      this.status_bad = result_bad.length;
      this.status_down = result_down.length; 
      this.status_broken = result_broken.length;
      
      
    })
  }
}

class Node1{
  id : number;
  A : string;
  S: string;
  V : string;
}

