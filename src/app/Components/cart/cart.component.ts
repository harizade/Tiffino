import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent,FormsModule, CommonModule, RouterModule, ReactiveFormsModule,MatFormFieldModule,MatSelectModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
//  data: any;       
// meals: any[] = [];

meals: any[] = [];
data: any = { cloudKitchenName: '' };

constructor(private api: ApiService) {
  this.api.viewCart().subscribe((res: any) => {
    console.log("Cart response:", res);
    this.data = res;
    this.meals = res.meals; 
  });
}




ngOnInit() {
  this.loadCart();
}

increaseQuantity(meal: any) {
  meal.quantity += 1;
  this.saveCart();
}

decreaseQuantity(meal: any) {
  if (meal.quantity > 1) {
    meal.quantity -= 1;
  } else {
    this.meals = this.meals.filter((m: any) => m !== meal);
  }
  this.saveCart();
}

getGrandTotal() {
  return this.meals.reduce((sum: number, m: any) => sum + (m.unitPrice * m.quantity), 0);
}

// ✅ Save cart to sessionStorage
saveCart() {
  const cartData = {
    cloudKitchenName: this.data.cloudKitchenName,
    meals: this.meals
  };
  sessionStorage.setItem('cart', JSON.stringify(cartData));
}

// ✅ Load cart from sessionStorage
loadCart() {
  const stored = sessionStorage.getItem('cart');
  if (stored) {
    const cart = JSON.parse(stored);
    this.data.cloudKitchenName = cart.cloudKitchenName;
    this.meals = cart.meals || [];
  }
}


}
