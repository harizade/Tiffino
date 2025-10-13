import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-filter-user',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './search-filter-user.component.html',
  styleUrl: './search-filter-user.component.css',
})
export class SearchFilterUserComponent {
  Meals: any[] = [];
  cuisineNames: string[] = [];
  cloudKitchenNames: string[] = [];
  searched = false;

  stateName: any;
  KitchenName: any;
  isLoading = false;

  cart: any = { cloudKitchenId: null, meals: [] };
  mealsInCart: any[] = []; 

  constructor(private api: ApiService, private router: Router) {
    this.api.getAllStateName().subscribe((res) => (this.stateName = res));
    this.api.getAllCloudKitchenName().subscribe((res) => (this.KitchenName = res));
     this.fetchCartItems();
  }
  fetchKitchens() {
    this.searched = true;
    const payload = {
      cuisineNames: this.cuisineNames,
      cloudKitchenNames: this.cloudKitchenNames,
    };

    this.api.searchFilterUser(payload).subscribe({
      next: (res: any) => {
        this.Meals = res || [];
        console.log('Meals found:', this.Meals);
      },
      error: (err) => {
        console.error('Error fetching data:', err);
        this.Meals = [];
      },
    });
  }

    fetchCartItems() {
    this.api.viewCart().subscribe({
      next: (res: any) => {
        this.cart = res || { cloudKitchenId: null, meals: [] };
      },
      error: (err) => console.error('Error fetching cart items:', err)
    });
  }
 addToCart(meal: any) {
  if (this.cart.cloudKitchenId && this.cart.cloudKitchenId !== meal.cloudKitchenId) {
    alert('You can only add meals from one cloud kitchen at a time!');
    return;
  }

  if (!this.cart.cloudKitchenId) {
    this.cart.cloudKitchenId = meal.cloudKitchenId;
  }

  const existingMeal = this.cart.meals.find(
    (m: any) => m.mealId === meal.mealId && m.cloudKitchenId === meal.cloudKitchenId
  );

  if (existingMeal) {
    existingMeal.quantity += 1;
  } else {
    this.cart.meals.push({
      mealId: meal.mealId,
      mealName: meal.mealName,
      quantity: 1,
      finalPrice: meal.mealFinalPrice,
      photos: meal.photos,
      cloudKitchenId: meal.cloudKitchenId,
      cloudKitchenName: meal.cloudKitchenName
    });
  }
  this.api.addToCart(this.cart).subscribe({
    next: () => {
      this.api.cartCount.next(true);
      this.fetchCartItems();
    },
    error: (err) => console.error('Error adding to cart:', err)
  });
}
checkIsItemInCart(mealId: number, cloudKitchenId: string): boolean {
  if (!this.cart || !this.cart.meals) return false;
  return this.cart.meals.some(
    (m: any) => m.mealId === mealId && this.cart.cloudKitchenId === cloudKitchenId
  );
}
goToCart(): void {
    this.router.navigate(['/cart']);
  }
}


