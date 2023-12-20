import { Component, AfterViewInit, Input, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit{
    private map: any;
    private marker: any;
    @Input()
    coordinates!: [number, number];

    constructor() {}
  
    private initMap(): void {
      this.map = L.map('map', {
        center: this.coordinates,
        zoom: 13,
      });
  
      const tiles = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          minZoom: 3,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }
      );
      tiles.addTo(this.map);

      this.marker = L.marker(this.coordinates || [45.2396, 19.8227]).addTo(this.map);
    }
  
    ngAfterViewInit(): void {
        let DefaultIcon = L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
          });
      
          L.Marker.prototype.options.icon = DefaultIcon;
      this.initMap();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['coordinates'] && this.map) {
          this.map.setView(this.coordinates, 15);
          this.marker.setLatLng(this.coordinates);
        }
      }
}
