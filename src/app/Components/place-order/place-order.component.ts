import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [NavbarComponent,CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.css'
})
export class PlaceOrderComponent {
 placeOrderForm :FormGroup

 constructor(private api:ApiService ,private router:Router){
  this.placeOrderForm = new FormGroup({
     phoneNo: new FormControl('', [Validators.required,Validators.pattern(/^[0-9]{10}$/)]),
     state: new FormControl('',[Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z]+$/)]),
     city: new FormControl('',[Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z\s-]+$/)]),
     address: new FormControl('',[Validators.required, Validators.minLength(3)]),
     pinCode: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]+$/)]),
    
  })
 }
  get phoneNo() { return this.placeOrderForm.get('phoneNo')!; }
  get state() { return this.placeOrderForm.get('state')!; }
  get city() { return this.placeOrderForm.get('city')!; }
  get address() { return this.placeOrderForm.get('address')!; }
  get pinCode() { return this.placeOrderForm.get('pinCode')!; }

  

 placeOrder() {
    if (this.placeOrderForm.invalid) {
      this.placeOrderForm.markAllAsTouched();
      return;
    }

  console.log('Payload:', this.placeOrderForm.value);

  this.api.placeOrder(this.placeOrderForm.value).subscribe({
    next: (res) => {
      console.log('Order placed successfully!', res);
      alert('✅ Order placed successfully!');
      this.placeOrderForm.reset();  
       this.router.navigate(['/trackOrder/'+res]);
       
    },
    error: (err) => {
      console.error('Error placing order:', err);
      alert('❌ Failed to place order!');
    }
  });
}




}
