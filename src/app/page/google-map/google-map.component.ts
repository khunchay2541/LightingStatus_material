import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { map, catchError } from 'rxjs/operators';

import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database'

import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
   
    public node1List: Node1[];
    public id : number;
    public A : string;
    public S: string;
    public V : string;
    public location : object;
    public searchPole :number
    public mapOverview = true 
  
    //-----------------map--------------
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
    //---------------------------------------------
    constructor(httpClient: HttpClient ,private  db: AngularFireDatabase) {
        //------------------map-----------------
        //this.addMarker(latLng1);
        //this.addMarker(latLng2);
          
      this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyCFeGNZiWmNXr6ULYUAm_63c-R5SVG6zCI', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
        //-------------- end map----------------------

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
    
      const data = this.node1List //ได้ array ข้อง Database
      console.log(this.node1List)
      const findLocation = this.node1List.filter (data => {
          return this.addMarker(data.location)
      })

      const len_Location = this.node1List.find (data => {
        return data.location
     })
     
    console.log(len_Location);
    
    })
  }


    searchPole1(){
        this.searchPole = 0
        this.mapOverview = false
    }

    searchPole2(){
        this.searchPole = 1
        this.mapOverview = false
    }

    searchPole3(){
        this.searchPole = 2
        this.mapOverview = false
    }

    searchPole4(){
        this.searchPole = 3
        this.mapOverview = false
    }

    searchPole5(){
        this.searchPole = 4
        this.mapOverview = false
    }

    searchPole6(){
        this.searchPole = 5
        this.mapOverview = false
    }

    searchPole7(){
        this.searchPole = 6
        this.mapOverview = false
    }

    searchPole8(){
        this.searchPole = 7
        this.mapOverview = false
    }

    searchPole9(){
        this.searchPole = 8
        this.mapOverview = false
    }

    searchPole10(){
        this.searchPole = 9
        this.mapOverview = false
    }

    mapOverviewTrue(){
        this.mapOverview = true
        this.searchPole = null
    }

    fontStyleControl = new FormControl();
    fontStyle?: string;
    

}
class Node1{
    id : number;
    A : string;
    S: string;
    V : string;
    location : object;
  }
  