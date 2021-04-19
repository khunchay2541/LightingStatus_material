import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'LightingStatus2';

  mobileQueryMax: MediaQueryList

  private _mobileQueryListener: ()=> void;

  constructor(changDetectorRef: ChangeDetectorRef,media: MediaMatcher){
    this._mobileQueryListener = () => changDetectorRef.detectChanges();
    this.mobileQueryMax = media.matchMedia('(max-width: 600px)');
    this.mobileQueryMax.addListener(this._mobileQueryListener);

  }
  ngOnDestroy(): void {
    this.mobileQueryMax.removeListener(this._mobileQueryListener)
  }

  onSayhi(text : string){
    //alert(text)
  }


}
