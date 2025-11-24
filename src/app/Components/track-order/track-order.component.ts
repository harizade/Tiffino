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
import { ActivatedRoute, RouterModule } from '@angular/router';
import * as L from 'leaflet';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../api.service';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-track-order',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements AfterViewInit {

  private map!: L.Map;
  orderId!: number;
  order: any = {};

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  kitchenIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40]
  });

  userIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40]
  });

  ngAfterViewInit(): void {
  setTimeout(() => {
    this.orderId = Number(this.route.snapshot.paramMap.get('orderId'));
    this.initMap();
    this.loadOrderFromAPI();
  }, 100); // 100ms delay ensures HTML is loaded
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

  private loadOrderFromAPI() {
    this.api.trackOrder(this.orderId).subscribe(async (res: any) => {
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

    L.marker(kitchenCoords, { icon: this.kitchenIcon }).addTo(this.map);
    L.marker(userCoords, { icon: this.userIcon }).addTo(this.map);

    this.map.fitBounds([kitchenCoords, userCoords]);

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
