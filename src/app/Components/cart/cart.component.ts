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


meals: any[] = [];
data: any = { cloudKitchenName: '' };

constructor(private api: ApiService) {
  this.api.viewCart().subscribe((res: any) => {
    console.log("Cart response:", res);
    this.data = res;
    this.meals = res.meals; 
  });
}


getGrandTotal() {
  return this.meals.reduce((sum: number, m: any) => sum + (m.unitPrice * m.quantity), 0);
}

removeItem(id: number) {
  this.api.removeCard(id).subscribe(res=>{
    this.api.cartCount.next(true);
    this.loadMeals()
  });
}
loadMeals() {
  this.api.viewCart().subscribe((res: any) => {
    this.data = res;
    this.meals = res.meals;
  });
}

changeQuantity(meal: any){
  this.api.incDec(meal).subscribe((res: any)=>{
    this.loadMeals();
  })
}


}
