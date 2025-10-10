import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MealImageComponent } from '../PopUp/meal-image/meal-image.component';

@Component({
  selector: 'app-state-meals',
  standalone: true,
  imports: [NavbarComponent,CommonModule ,MatDialogModule,],
  templateUrl: './state-meals.component.html',
  styleUrl: './state-meals.component.css'
})
export class StateMealsComponent {
  cartItems: any[] = [];
  stateName!: string;
  meals: any = [];

  Meals: any[] = [];
  cuisineNames: string[] = [];
  cloudKitchenNames: string [] = [] ;
  searched = false; 
  isLoading = false;


  constructor(private route: ActivatedRoute, private api: ApiService ,private router:Router, private popup:MatDialog) {
  this.getCartItems();
    
  }

   openPopup(meal:any){
      this.popup.open(MealImageComponent, { data: meal})
    }

  ngOnInit(): void {
    this.stateName = this.route.snapshot.paramMap.get('stateName')!;
    
    this.api.getAvailableMealsByStateName(this.stateName).subscribe({
      next: (res) => {
        console.log('Meals:', res);
        this.meals = res;
      },
      error: (err) => {
        console.error('Error fetching meals:', err);
      }
    });
    
      
  }



  
   // ✅ Add a meal to the cart
 
cart: any = { cloudKitchenId: null, meals: [] };

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

    console.log(' Cart updated:', this.cart);

    // Send updated cart to backend
    this.api.addToCart(this.cart).subscribe({
      next: (res) => {
        console.log('✅ Added to cart:', res);
        this.getCartItems();
        this.api.cartCount.next(true);
        this.isLoading = false;
      },
      error: (err) => {
        console.error(' Failed to add to cart:', err);
        this.isLoading = false;
      }
    });
  }

  //  Fetch current cart items
  getCartItems() {
    this.api.viewCart().subscribe({
      next: (res: any) => {
        this.cartItems = res.meals || [];
        console.log(' Current Cart Items:', this.cartItems);
      },
      error: (err) => {
        console.error(' Failed to fetch cart items:', err);
      }
    });
  }

  //  Check if meal exists in cart
  isItemInCart(mealId: number): boolean {
    return !!this.cartItems.find((item: any) => item.mealId === mealId);
  }

  //  Navigate to cart page
  goToCart() {
    this.router.navigate(['/cart']);
  }
}



