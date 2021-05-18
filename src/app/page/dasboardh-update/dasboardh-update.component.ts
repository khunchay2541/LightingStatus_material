import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database'
import {Observable} from 'rxjs'
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-dasboardh-update',
  templateUrl: './dasboardh-update.component.html',
  styleUrls: ['./dasboardh-update.component.css']
})
export class DasboardhUpdateComponent implements OnInit {

  
    public isEdit = false;
    //--------------------------------------

    displayedColumns = ['id', 'V', 'A','S']
    public dataSource = new MatTableDataSource<any>();
    
    //public dataSource  : any 
    items  : Observable <any>
  
    public node1List: Node1[];
  
    public id : number;
    public A : string;
    public S: string;
    public V : string;
    public note : string;
    public location : any;
    public lat : number
    public lng : number
  
  
    constructor(private  db: AngularFireDatabase) { 
      this.getDataFromRealtime()
         //this.db.object('users/0').set({id: 1, name: 'Khunchay',phone:'01234'})
    this.getStarted();
      
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
  
        const data = this.node1List //ได้ array ข้อง Database
        this.dataSource.data  = data
      })
    }
//--------------------test----------------------------------------------------------- 
        async getStarted(){
            var node1: Node1[];
            await this.getUserFreomRealtimDB().then(value => {
            node1 = value as Node1[];
            })
        this.node1List = node1;
        console.log(this.node1List)
        

        }

        getUserFreomRealtimDB(){
            return new Promise((resove,reject)=>{
            this.db.list('node1').valueChanges().subscribe(value => {
                resove(value);
            });
            });
        }
        //***********เพิ่ม ข้อมูล************************** */


        clearFireld(){
            this.V = '',
            this.A = '';   
            this.S = '';  
            this.note = ''; 
            this.lat = null;
            this.lng = null;
        }
        //*********************************************** */
        getUserFromTbl(id:number){
            var node1 = this.node1List.find(element =>{
            return element.id == id;
            });
            this.id = node1.id;
            this.V = node1.V;
            this.A = node1.A;
            this.S = node1.S;
            this.note = node1.note;
            this.lat = node1.location.lat;
            this.lng = node1.location.lng;
            

            this.isEdit = true;
        }
        //********** อัพเดท ********************/
        async updateUser(){
            
            
            var data = {
            id : this.id ,
            V : this.V,
            A: this.A,
            S : this.S,
            note : this.note,
            location:  {lat: this.lat , lng: this.lng }
            }

            await this.db.object('node1/'+(String(this.id))).set(data);
            await this.getStarted();

            this.clearFireld();

            this.isEdit = false;
        }


  }
  
  
  class Node1{
    id : number;
    A : string;
    S: string;
    V : string;
    note : string;
    location : any;
    lat: number;
    lng:number
  }
  
