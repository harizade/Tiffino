import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delivery-partner-dashbord',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './delivery-partner-dashbord.component.html',
  styleUrl: './delivery-partner-dashbord.component.css'
})
export class DeliveryPartnerDashbordComponent {
// data:any;
//   constructor(private api:ApiService){
//     this.api.pikUpOrder(this.data).subscribe(res=>{

//     })
//   }

//    logout(){
//      this.api.adminLOgout();  
//    }

//    deliverOrder(){
    
//    }



 deliveryId: string = '';

  constructor(private api:ApiService) {
    // this. pickupOrder()
  }

  // API for pickup
  pickupOrder() {
    if (!this.deliveryId) {
      alert('Please enter an order ID!');
      return;
    }

    this.api.pikUpOrder(this.deliveryId).subscribe({
        next: (res) => {
          alert('Order picked up successfully!');
          console.log(res);
        },
       error: (err) => {
  console.error("Deliver API failed:", err);
  alert(`Failed to deliver order: ${err.status} ${err.statusText}`);
}
      });
  }

  // Example delivered button
  deliverOrder() {
    if (!this.deliveryId) {
      alert('Please enter order ID first!');
      return;
    }

    this.api.deliverOrder(this.deliveryId)
      .subscribe({
        next: (res) => {
          alert('Order delivered successfully!');
        },
        error: (err) => {
  console.error("Deliver API failed:", err);
  alert(`Failed to deliver order: ${err.status} ${err.statusText}`);
}
      });
  }

  logout(){
    this.api.adminLOgout();  
  }
}
