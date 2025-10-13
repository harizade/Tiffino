import { Component, ChangeDetectorRef } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MealImageComponent } from '../PopUp/meal-image/meal-image.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-state-meals',
  standalone: true,
  imports: [NavbarComponent, CommonModule, MatDialogModule,ReactiveFormsModule],
  templateUrl: './state-meals.component.html',
  styleUrl: './state-meals.component.css'
})
export class StateMealsComponent {
  stateName!: string;
  meal: any[] = [];
  cart: any = { cloudKitchenId: null, meals: [] };

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private popup: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.stateName = this.route.snapshot.paramMap.get('stateName')!;
    this.loadMeals();
    this.fetchCartItems();
  }

  loadMeals() {
    this.api.getAvailableMealsByStateName(this.stateName).subscribe({
      next: (res: any) => {
        this.meal = Array.isArray(res) ? res : [];
      },
      error: (err) => console.error('Error fetching meals:', err)
    });
  }

  openPopup(meal: any) {
    this.popup.open(MealImageComponent, { data: meal });
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
