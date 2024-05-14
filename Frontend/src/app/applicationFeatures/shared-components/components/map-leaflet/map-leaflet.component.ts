import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import * as L from 'leaflet';
import 'leaflet.fullscreen';

import { Subscription } from 'rxjs';
import { ILocationMarker } from 'src/app/sharedFeatures/models/ilocation-marker';
import { IMapLocation } from 'src/app/sharedFeatures/models/imap-location';

@Component({
  selector: 'msn-map',
  templateUrl: './map-leaflet.component.html',
  styleUrls: ['./map-leaflet.component.scss'],
})
export class MapLeafletComponent implements OnInit, OnDestroy, OnChanges {
  @Input() latitude: number = 30.575766;
  @Input() longitude: number = 31.516666;
  @Input() markers: ILocationMarker[] = [];
  @Input() totalMarkersCount: number = 0;
  @Input() addMarkerOnCenter: boolean = true;
  @Input() addMarkerOnClick: boolean = true;
  @Input() readOnly: boolean = false;
  @Input() navigate: boolean = true;
  @Input() zoom: number = 14;

  @Output() mapClicked: EventEmitter<IMapLocation> =
    new EventEmitter<IMapLocation>();

  @Output() finishedLoading: EventEmitter<void> = new EventEmitter<void>();

  map!: L.Map;
  loadedMarkers: Record<number, L.Marker> = {};
  clickedMarker!: any;
  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 1,
      }),
    ],
    zoom: 14,
    center: L.latLng(30.575766, 31.516666),
  };

  icon = L.icon({
    iconUrl: 'assets/media/pin.svg',
    iconAnchor: [11, 35], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -40], // point from which the popup should open relative to the iconAnchor
    // iconRetinaUrl: "assets/marker-icon-2x.png",
    // iconSize: [38, 95], // size of the icon
    shadowUrl: '',
    // shadowUrl: "assets/marker-shadow.png",
    // shadowSize: [50, 64], // size of the shadow
    // shadowAnchor: [4, 62], // the same for the shadow
  });
  clickCount: number = 0; // to prevent double click on map
  addressSub: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.options = {
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          minZoom: 1,
        }),
      ],
      zoom: this.zoom,
      center: L.latLng(this.latitude, this.longitude),
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      !changes['latitude']?.firstChange &&
      changes['latitude']?.currentValue
    ) {
      this.loadLocations();
    }
  }
  openGoogleMaps(lat: number = this.latitude, lng: number = this.longitude) {
    window.open('https://maps.google.com/?q=' + lat + ',' + lng);
  }

  onMapReady(map: L.Map) {
    map.getContainer().focus = () => {};

    // get a local reference to the map as we need it later
    this.map = map;

    this.loadLocations();
  }

  loadLocations(): void {
    // if markers input - else mark the center
    if (this.addMarkerOnCenter) {
      const latLng = new L.LatLng(this.latitude, this.longitude);
      const location = { latLng };
      this.loadMarker(location);
    }
  }

  loadMarker(location: IMapLocation): void {
    // remove marked Pin
    if (this.addMarkerOnClick && this.clickedMarker && this.map)
      this.map.removeLayer(this.clickedMarker);

    // add new marker
    const m = L.marker(location.latLng, {
      icon: this.icon,
    });

    m.addTo(this.map);
    this.clickedMarker = m;

    if (location.latLng)
      this.map.flyToBounds(L.latLngBounds(location.latLng, location.latLng), {
        maxZoom: 16,
      });
  }

  onMapClick(event: any): void {
    if (this.readOnly) {
      if (this.navigate) this.openGoogleMaps();
      return;
    }
    this.clickCount += 1;
    if (this.clickCount !== 1) return;

    // remove marked Pin
    if (this.addMarkerOnClick && this.clickedMarker && this.map)
      this.map.removeLayer(this.clickedMarker);

    this.markAndEmitLocation(event.latlng, '');

    this.clickCount = 0;
  }

  markAndEmitLocation(latlng: L.LatLng, address: string): void {
    const location = { latLng: latlng, address: address };
    if (this.addMarkerOnClick) this.loadMarker(location);
    this.mapClicked.emit(location);
  }

  onDoubleClick(event: any): void {
    this.clickCount = 0;
    event.preventDefault();
  }

  ngOnDestroy(): void {
    if (this.addressSub) this.addressSub.unsubscribe();
  }
}
