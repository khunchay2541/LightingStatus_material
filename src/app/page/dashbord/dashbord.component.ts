import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database'
import {Observable} from 'rxjs'
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  displayedColumns = ['id', 'V', 'A','S']
  public dataSource = new MatTableDataSource<any>();


  //public dataSource  : any 
  items  : Observable <any>

  public node1List: Node1[];

  public id : number;
  public A : string;
  public S: string;
  public V : string;

 

  constructor(private  db: AngularFireDatabase) { 
    this.getDataFromRealtime()
    
 }

  ngOnInit(): void {
     //this.feedDataTable();
  }

  //---------- ไม่ได้ ใช้
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
  //--------- 


  getDataFromRealtime(){
    this.db.list('node1').snapshotChanges().forEach(datasSnapshot=>{
      this.node1List = [];
      datasSnapshot.forEach(dataSnapshot=>{
        let data = dataSnapshot.payload.toJSON();
        this.node1List.push(data as Node1)
      })

      const data = this.node1List //ได้ array ข้อง Database
      this.dataSource.data  = data
    })
  }
}


class Node1{
  id : number;
  A : string;
  S: string;
  V : string;
}

