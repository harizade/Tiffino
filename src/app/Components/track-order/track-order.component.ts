// import { Component, OnInit } from '@angular/core';
// import { NavbarComponent } from '../navbar/navbar.component';
// import { RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { GoogleMapsModule } from '@angular/google-maps';

// @Component({
//   selector: 'app-track-order',
//   standalone: true,
//   imports: [NavbarComponent, CommonModule, RouterModule, GoogleMapsModule],
//   templateUrl: './track-order.component.html',
//   styleUrls: ['./track-order.component.css']
// })
// export class TrackOrderComponent implements OnInit {

//   response = {
//     orderId: 1,
//     userAddress: "karvenagar pune ,411052",
//     cloudKitchenAddress: "katraj pune ,411046"
//   };

//   center: google.maps.LatLngLiteral = { lat: 18.5204, lng: 73.8567 };

//   cloudKitchenMarker: google.maps.LatLngLiteral | null = null;
//   userMarker: google.maps.LatLngLiteral | null = null;

//   routePath: google.maps.LatLngLiteral[] = [];

//   polylineOptions: google.maps.PolylineOptions = {
//     strokeColor: "#FF0000",
//     strokeWeight: 4,
//     strokeOpacity: 1.0
//   };

//   geocoder = new google.maps.Geocoder();

//   ngOnInit() {
//     this.loadMapData();
//   }

//   loadMapData() {
//     this.geocodeAddress(this.response.cloudKitchenAddress).then(kitchenLocation => {
//       this.cloudKitchenMarker = kitchenLocation;

//       this.geocodeAddress(this.response.userAddress).then(userLocation => {

//         this.userMarker = userLocation;

//         this.center = {
//           lat: (kitchenLocation.lat + userLocation.lat) / 2,
//           lng: (kitchenLocation.lng + userLocation.lng) / 2
//         };

//         this.routePath = [kitchenLocation, userLocation];
//       });
//     });
//   }

//   geocodeAddress(address: string): Promise<google.maps.LatLngLiteral> {
//     return new Promise((resolve, reject) => {
//       this.geocoder.geocode({ address }, (results, status) => {
//         if (status === "OK" && results && results.length > 0) {
//           resolve({
//             lat: results[0].geometry.location.lat(),
//             lng: results[0].geometry.location.lng()
//           });
//         } else {
//           reject("Geocode failed: " + status);
//         }
//       });
//     });
//   }

// }


   



//  orderId!: number;
//   orderStatus!: string;
//   orderData:any;

//   constructor(private route:ActivatedRoute, private api: ApiService) {}

//   ngOnInit() {
//     this.orderId = +this.route.snapshot.paramMap.get('orderId')!;
//     this.loadOrder();
//   }

//   loadOrder() {
//     this.api.trackOrder(this.orderId).subscribe(res=>{
//       console.log(res);
//       this.orderData = res;
//     });
//   }




// AIzaSyBgBzpXw_MmTzFpFWEAlPDlkXGzffRm6Dg





import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-track-order',
  standalone: true,
  imports: [NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <div id="map" style="height: calc(100vh - 70px); width: 100%; margin-top: 0;"></div>
  `
})
export class TrackOrderComponent implements AfterViewInit {

  private map!: L.Map;
  orderId!: number;
  order: any = {};

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngAfterViewInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('orderId'));
    console.log("ORDER ID =", this.orderId);

    this.initMap();
    this.loadOrderFromAPI();
  }

  private initMap(): void {
    this.map = L.map('map').setView([18.5204, 73.8567], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
  }

  private async geocode(address: string): Promise<[number, number] | null> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.length) return null;

    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  }

  // ⭐ Call your API
  private loadOrderFromAPI() {
    this.api.trackOrder(this.orderId).subscribe(async (res: any) => {
      console.log("API Response:", res);

      // API MUST RETURN:
      // { userAddress: "...", cloudKitchenAddress: "..." }
      this.order = res;

      await this.loadLocations();
    });
  }

  private async loadLocations() {
    const kitchenCoords = await this.geocode(this.order.cloudKitchenAddress);
    const userCoords = await this.geocode(this.order.userAddress);

    if (!kitchenCoords || !userCoords) {
      alert("Address not found!");
      return;
    }

    // Markers
    L.marker(kitchenCoords).addTo(this.map);
    L.marker(userCoords).addTo(this.map);

    this.map.fitBounds([kitchenCoords, userCoords]);

    // 🚗 Shortest Driving Route
    const url =
      `https://router.project-osrm.org/route/v1/driving/` +
      `${kitchenCoords[1]},${kitchenCoords[0]};${userCoords[1]},${userCoords[0]}` +
      `?overview=full&geometries=geojson`;

    const routeRes = await fetch(url);
    const routeData = await routeRes.json();

    if (routeData.routes?.length) {
      const coords = routeData.routes[0].geometry.coordinates;
      const latlngs = coords.map((c: any) => [c[1], c[0]]);

      L.polyline(latlngs, { color: 'blue', weight: 5 }).addTo(this.map);
    }
  }
}
