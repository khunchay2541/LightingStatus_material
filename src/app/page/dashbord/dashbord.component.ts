import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database'
import {Observable} from 'rxjs'
import { MatTableDataSource } from '@angular/material/table';

import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/internal/observable/of';
import { map, catchError } from 'rxjs/operators';


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
  public location : object;

 //----------- map --------------------
  apiLoaded: Observable<boolean>;

  public latLngCenter : { lat: 13.732068853211791, lng: 100.77009050181167 }

  options: google.maps.MapOptions = {
    center: { lat: 13.730136207394786, lng: 100.75278758058228 },
    zoom: 16
  };
  
  markerOptions: google.maps.MarkerOptions = { draggable: true };
  markerPositions: google.maps.LatLngLiteral[] =[]
 
  addMarker(latLng) {
    this.markerPositions.push(latLng);
  }

  constructor(private  db: AngularFireDatabase, httpClient: HttpClient) { 

    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyCFeGNZiWmNXr6ULYUAm_63c-R5SVG6zCI', 'callback')
    .pipe(
      map(() => true),
      catchError(() => of(false)),
    );
    this.getDataFromRealtime()
    
 }

  ngOnInit(): void {
     //this.feedDataTable();
  }

  //---------- ไม่ได้ ใช้------------------------------
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
  //--------- -----------------------------------


  getDataFromRealtime(){
    this.db.list('node1').snapshotChanges().forEach(datasSnapshot=>{
      this.node1List = [];
      datasSnapshot.forEach(dataSnapshot=>{
        let data = dataSnapshot.payload.toJSON();
        this.node1List.push(data as Node1)
        
    })
    const data = this.node1List //ได้ array ข้อง Database
      this.dataSource.data  = data

    const centerMap = this.node1List.find(data=>{
        return data.location
    })
    this.addMarker(centerMap.location)
    console.log(centerMap.location)

    })

 
        
  }
}


class Node1{
  id : number;
  A : string;
  S: string;
  V : string;
  location : object
 
}

