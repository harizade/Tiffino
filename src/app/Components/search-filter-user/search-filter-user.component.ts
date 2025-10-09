import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { EOF } from '@angular/compiler';

@Component({
  selector: 'app-search-filter-user',
  standalone: true,
  imports: [NavbarComponent,CommonModule,FormsModule,MatFormFieldModule,MatSelectModule,ReactiveFormsModule],
  templateUrl: './search-filter-user.component.html',
  styleUrl: './search-filter-user.component.css'
})
export class SearchFilterUserComponent {
// cart: any = { cloudKitchenId: null, meals: [] }; 
 Meals: any[] = [];
  cuisineNames: string[] = [];
  cloudKitchenNames: string [] = [] ;
  searched = false; 
 
  stateName:any;
  KitchenName:any;
  constructor(private api: ApiService ,private router:Router) {
    this.api.getAllStateName().subscribe(res=>{
      console.log(res);
      this.stateName= res;
    })

    this.api.getAllCloudKitchenName().subscribe(res=>{
      console.log(res);
      this.KitchenName= res;
    })

  }

  fetchKitchens() {
    this.searched = true;

    const payload = {
       cuisineNames: this.cuisineNames,
      cloudKitchenNames: this.cloudKitchenNames,
    };

    this.api.searchFilterUser(payload).subscribe({
      next: (res: any) => {
        this.Meals = res;
        console.log('Meals found:', this.Meals);
      },
      error: (err) => {
        console.error('Error fetching data:', err);
        this.Meals = []; 
      },
    });
  }

   // ✅ Add a meal to the cart
  isLoading = false;
cart: any = { cloudKitchenId: null, meals: [] };
meals: any[] = [];



ngOnInit() {
  this.getCartItems();
}


// ✅ Add to cart
addToCart(meal: any, cloudKitchenId: any) {
  if (this.isLoading) return;
  this.isLoading = true;

  // Allow only one cloud kitchen
  if (!this.cart.cloudKitchenId) {
    this.cart.cloudKitchenId = cloudKitchenId;
  }
  if (this.cart.cloudKitchenId !== cloudKitchenId) {
    alert('⚠️ You can only add items from one cloud kitchen!');
    this.isLoading = false;
    return;
  }

  // Check if meal already exists
  const existingMeal = this.cart.meals.find((m: any) => m.mealId === meal.mealId);
  if (existingMeal) {
    existingMeal.quantity += 1;
  } else {
    this.cart.meals.push({ mealId: meal.mealId, quantity: 1 });
  }

  console.log('🛒 Cart updated:', this.cart);

  // Send updated cart to backend
  this.api.addToCart(this.cart).subscribe({
    next: (res) => {
      console.log('✅ Added to cart:', res);
      this.getCartItems();
      this.api.cartCount.next(true);
      this.isLoading = false;
    },
    error: (err) => {
      console.error('❌ Failed to add to cart:', err);
      this.isLoading = false;
    }
  });
}

// ✅ Fetch cart items
getCartItems() {
  this.api.viewCart().subscribe({
    next: (res: any) => {
      this.meals = res.meals || [];
    },
    error: (err) => {
      console.error('❌ Failed to fetch cart items:', err);
    }
  });
}

// ✅ Check if meal exists in cart
isItemInCart(mealId: number): boolean {
  return !!this.meals?.find((meal: any) => meal.mealId === mealId);
}

// ✅ Navigate to cart page
goToCart() {
  this.router.navigate(['/cart']);
}

}
  

