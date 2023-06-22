import { Component, ElementRef } from '@angular/core';
import {} from 'googlemaps';
import { OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit  {
  map!: google.maps.Map;
  prevZone: any = 1;
  actZone: any = 0;
  ngOnInit(): void {
  }
  @ViewChild('map') mapElement: any;
  @ViewChild('sidebar')sidebar!: ElementRef<HTMLDivElement>;
   

    showSidebar(): void{
      this.sidebar.nativeElement.style.width = '240px';
    }
    hideSidebar(): void{
      this.sidebar.nativeElement.style.width = '0px';
      
    }
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
      this.map.data.addListener('click', function(event) {
        console.log(event.feature.getProperty('Id'))
        document.getElementById("1")?.setAttribute("hidden","hidden")
        document.getElementById("2")?.setAttribute("hidden","hidden")
        document.getElementById("3")?.setAttribute("hidden","hidden")
        document.getElementById("4")?.setAttribute("hidden","hidden")
        document.getElementById("5")?.setAttribute("hidden","hidden")
        document.getElementById("6")?.setAttribute("hidden","hidden")
       document.getElementById(""+event.feature.getProperty('Id'))?.removeAttribute("hidden");
        
        
      });
   }
}
