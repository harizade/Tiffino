import { Component } from '@angular/core';
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
 data: any[] = [];
deliveryPersons: any[] = [];
selectedOrderId: number | null = null;

constructor(private api: ApiService) {
  // Get all orders
  this.api.getAllOrder().subscribe(res => {
    this.data = res;
  });

  // Get all delivery persons
  this.api.getAllDeliveryPersons().subscribe(res => {
    this.deliveryPersons = res;
  });
}

// Step 1: When Assign clicked
showDeliveryPersons(orderId: number) {
  this.selectedOrderId = orderId;
}

// Step 2: Assign API call
assignOrder(orderId: number, deliveryPersonId: number) {
  this.api.assignOrderToDeliveryPerson(orderId, deliveryPersonId).subscribe({
    next: (res) => {
      alert(`Order ${orderId} assigned successfully!`);
      this.selectedOrderId = null; 
    },
    error: (err) => {
      console.error(err);
      alert("Failed to assign order!");
    }
  });
}

}
