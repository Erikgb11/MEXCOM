import { Component } from '@angular/core';
import {} from 'googlemaps';
import { OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit  {
  ngOnInit(): void {
  }
  @ViewChild('map') mapElement: any;
    map!: google.maps.Map;
    ngAfterViewInit(): void {
      const mapProperties = {
           center: new google.maps.LatLng(        19.504047, -99.140781
            ),
           zoom: 15,
           mapTypeId: google.maps.MapTypeId.TERRAIN
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
      this.map.data.loadGeoJson('assets/zonas.json');
      this.map.data.setStyle((feature) => {
        return /** @type {google.maps.Data.StyleOptions} */ {
          fillColor: feature.getProperty("fill"),
          strokeWeight: 1,
        };
      });
   }
}
