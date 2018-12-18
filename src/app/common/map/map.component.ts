import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MapService } from './map.service';

@Component({
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() location:string;
  locationNotFound: boolean = false;
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(private mapService: MapService,
              private ref: ChangeDetectorRef) { }

  ngOnInit() {
  }

  mapReadyHandler(){
    this.mapService.getGeoLocation(this.location).subscribe(
      (coordinates) => {
        this.lat = coordinates.lat;
        this.lng = coordinates.lng;
        this.ref.detectChanges();
      },
      ()=>{
        this.locationNotFound = true;
      });

  }

}
