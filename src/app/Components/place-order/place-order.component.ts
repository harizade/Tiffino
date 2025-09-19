import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [NavbarComponent,CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.css'
})
export class PlaceOrderComponent {
 placeOrderForm :FormGroup

 constructor(private api:ApiService){
  this.placeOrderForm = new FormGroup({
     phoneNo: new FormControl(''),
     state: new FormControl(''),
     city: new FormControl(''),
     address: new FormControl(''),
     pinCode: new FormControl(''),
    
  })

  
 }

 placeOrder() {
  console.log('Payload:', this.placeOrderForm.value);

  this.api.placeOrder(this.placeOrderForm.value).subscribe({
    next: (res) => {
      console.log('Order placed successfully!', res);
      alert('✅ Order placed successfully!');
      this.placeOrderForm.reset();   
    },
    error: (err) => {
      console.error('Error placing order:', err);
      alert('❌ Failed to place order!');
    }
  });
}




}
