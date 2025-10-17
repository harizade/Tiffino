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
acceptOrder(orderId: number) {
  this.api.acceptOrder(orderId).subscribe({
    next: (res) => {
      console.log('Order accepted:', res);
      alert('✅ Order accepted!');
    this.loadOrders();
    },
    error: (err) => {
      console.error('Error while accepting order:', err);
      alert('❌ Failed to accept order. Please try again.');
    }
  });
}

orderPrepared(orderId: number) {
  this.api.orderPrepared(orderId).subscribe({
    next: (res) => {
      console.log('Order Prepared:', res);
      alert('✅ orderPrepared!');
    this.loadOrders();
    },
    error: (err) => {
      console.error('Error while Order Prepared:', err);
      alert('❌ Failed to Order Prepared. Please try again.');
    }
  });
}



}