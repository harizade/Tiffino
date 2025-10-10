import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
//  data: any[] = [];
//   deliveryPersons: any[] = [];
//   selectedOrderId: number | null = null;

//   constructor(private api: ApiService) {
//     this.loadOrders();
//     this.api.getAllDeliveryPersons().subscribe(res => {
//       this.deliveryPersons = res;
//     });
//   }

//   loadOrders() {
//     this.api.getAllOrder().subscribe(res => {
//       this.data = res;
//     });
//   }

//   showDeliveryPersons(orderId: number) {
//     this.selectedOrderId = orderId;
//   }

//   assignOrder(orderId: number, deliveryPersonId: number) {
//     this.api.assignOrderToDeliveryPerson(orderId, deliveryPersonId).subscribe({
//       next: () => {
//         alert(`Order ${orderId} assigned successfully!`);
//         const order = this.data.find(o => o.orderId === orderId);
//         if (order) {
//           order.assigned = true; 
//         }
//         this.selectedOrderId = null;
//       },
//       error: (err) => {
//         console.error(err);
//         alert('Failed to assign order!');
//       }
//     });
//   }


// }




data: any[] = [];
deliveryPersons: any[] = [];
selectedOrderId: number | null = null;

constructor(private api: ApiService) {
  this.loadOrders();
  this.loadDeliveryPersons();
}

loadOrders() {
  this.api.getAllOrder().subscribe(res => {
    this.data = res;
  });
}

loadDeliveryPersons() {
  this.api.getAllDeliveryPersons().subscribe(res => {
    this.deliveryPersons = res;
  });
}

showDeliveryPersons(orderId: number) {
  this.selectedOrderId = orderId;
}

assignOrder(orderId: number, deliveryPersonId: number) {
  this.api.assignOrderToDeliveryPerson(orderId, deliveryPersonId).subscribe({
    next: () => {
      alert(`Order ${orderId} assigned successfully!`);
      const order = this.data.find(o => o.orderId === orderId);
      if (order) {
        order.assigned = true;
      }
      this.selectedOrderId = null;
    },
    error: (err) => {
      console.error(err);
      alert('Failed to assign order!');
    }
  });
}
}