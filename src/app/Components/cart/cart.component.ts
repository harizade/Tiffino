import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
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

constructor(private api: ApiService ,private router:Router)  {
  this.viewCart();
}

viewCart(){
this.api.viewCart().subscribe((res: any) => {
    console.log("Cart response:", res);
    this.data = res;
    this.meals = res.meals; 
  });
}

// getGrandTotal() {
//   return this.meals.reduce((sum: number, m: any) => sum + (m.unitPrice * m.quantity), 0);
// }

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

commonAllergies = ['Peanuts', 'Dairy', 'Gluten', 'Soy', 'Eggs', 'Shellfish', 'Sesame'];
selectedAllergies: string[] = [];
customAllergy: string = '';

toggleAllergy(allergy: string) {
  const index = this.selectedAllergies.indexOf(allergy);
  if (index > -1) {
    this.selectedAllergies.splice(index, 1);
  } else {
    this.selectedAllergies.push(allergy);
  }
}

addCustomAllergy() {
  this.api.addAllergies( this.selectedAllergies).subscribe({
    next: () => {
    this.loadMeals() ;
    },
    error: (err) => console.error(err)
  });
  const trimmed = this.customAllergy.trim();
  if (trimmed && !this.selectedAllergies.includes(trimmed)) {
    this.selectedAllergies.push(trimmed);
  }
  this.customAllergy = '';
}

removeAllergy(allergy: string) {
  this.selectedAllergies = this.selectedAllergies.filter(a => a !== allergy);
}

}
