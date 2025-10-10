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
  mealsInCart: any[] = []; // renamed to avoid confusion with Meals[]

  constructor(private api: ApiService, private router: Router) {
    // Fetch initial dropdown data
    this.api.getAllStateName().subscribe((res) => (this.stateName = res));
    this.api.getAllCloudKitchenName().subscribe((res) => (this.KitchenName = res));
  }

  ngOnInit() {
    this.getCartItems();
  }

  // ✅ Search meals
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

  // ✅ Add to Cart
  addToCart(meal: any, cloudKitchenId: string) {
    if (this.isLoading) return;
    this.isLoading = true;

    // Initialize cart if not present
    if (!this.cart) this.cart = { cloudKitchenId: null, meals: [] };

    // Allow only one cloud kitchen
    if (!this.cart.cloudKitchenId) {
      this.cart.cloudKitchenId = cloudKitchenId;
    }

    if (this.cart.cloudKitchenId !== cloudKitchenId) {
      alert('⚠️ You can only add items from one cloud kitchen!');
      this.isLoading = false;
      return;
    }

    // ✅ Check existing meal in local cart
    const existingMeal = this.cart.meals.find(
      (m: any) => m.mealId === meal.mealId && m.cloudKitchenId === cloudKitchenId
    );

    if (existingMeal) {
      existingMeal.quantity += 1;
    } else {
      this.cart.meals.push({
        mealId: meal.mealId,
        quantity: 1,
        cloudKitchenId: cloudKitchenId,
        mealName: meal.mealName,
        finalPrice: meal.finalPrice,
        photos: meal.photos,
      });
    }

    // ✅ Instantly reflect UI change
    this.mealsInCart.push({ mealId: meal.mealId, cloudKitchenId });
    console.log('🛒 Local cart updated:', this.cart);

    // Send updated cart to backend
    this.api.addToCart(this.cart).subscribe({
      next: (res) => {
        console.log('✅ Added to cart (backend):', res);
        this.getCartItems(); // Sync with backend
        this.api.cartCount.next(true);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Failed to add to cart:', err);
        this.isLoading = false;
      },
    });
  }

  // ✅ Fetch cart items
  getCartItems() {
    this.api.viewCart().subscribe({
      next: (res: any) => {
        this.mealsInCart = res.meals?.map((m: any) => ({
          mealId: m.mealId,
          cloudKitchenId: m.cloudKitchenId,
        })) || [];
        console.log('🛒 Current cart items:', this.mealsInCart);
      },
      error: (err) => {
        console.error('❌ Failed to fetch cart items:', err);
      },
    });
  }

  // ✅ Check if meal already exists in cart
  isItemInCart(mealId: number, cloudKitchenId: string): boolean {
    return !!this.mealsInCart.find(
      (meal: any) => meal.mealId === mealId && meal.cloudKitchenId === cloudKitchenId
    );
  }

  // ✅ Go to Cart
  goToCart() {
    this.router.navigate(['/cart']);
  }
}
