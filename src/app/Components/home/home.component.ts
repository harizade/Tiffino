import { Component, AfterViewInit, ViewChild, ElementRef, NgModule } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { MealImageComponent } from '../PopUp/meal-image/meal-image.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterModule, CommonModule, MatDialogModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('container', { static: false }) containerRef!: ElementRef;
  @ViewChild('marquee', { static: true }) marqueeRef!: ElementRef;
  position = 0;
  speed = 0.5;          
  pauseTime = 5000;  
  isPaused = false;
  animationFrameId: number | null = null;
  data: any;
  meals: any;



flattenMeals(res: any): any[] {
  let result: any[] = [];
  res.forEach((cuisineObj: any) => {
    cuisineObj.meals.forEach((meal: any) => {
      result.push({
        cuisine: cuisineObj.cuisine,
        mealId: meal.mealId,
        mealName: meal.mealName,
        finalPrice: meal.finalPrice,
        originalPrice: meal.originalPrice,
        photos: meal.photos,
        description: meal.description,
        nutritionalInformation: meal.nutritionalInformation,
        kitchens: meal.kitchens
      });
    });
  });
  return result;
}





  constructor(private api: ApiService, private popup: MatDialog) {
    this.api.allAvailableMeals().subscribe((res) => {
      this.data = this.flattenMeals(res);
      console.log(this.data);
    });
    this.getchCartItems();
  }
  // flattenMeals(data: any) {
  //   return data.flatMap((cuisineObj: any) =>
  //     cuisineObj.meals.map((meal: any) => ({
  //       ...meal,
  //       cuisine: cuisineObj.cuisine,
  //     }))
  //   );
  // }

ngAfterViewInit() {
  // Start at 0 so first 6 items are visible
  this.position = 0;
  this.animate();
}

animate() {
  if (this.isPaused || this.animationFrameId !== null) return;

  this.animationFrameId = requestAnimationFrame(() => {
    this.animationFrameId = null;

    this.position -= this.speed;
    this.marqueeRef.nativeElement.style.transform = `translateX(${this.position}px)`;

    const marqueeWidth = this.marqueeRef.nativeElement.scrollWidth;
    const containerWidth = this.containerRef.nativeElement.offsetWidth;

    if (this.position <= -(marqueeWidth - containerWidth)) {
      this.isPaused = true;
      cancelAnimationFrame(this.animationFrameId!);
      this.animationFrameId = null;

      setTimeout(() => {
        this.position = 0;
        this.isPaused = false;
        this.animate();
      }, this.pauseTime);
    } else {
      this.animate(); 
    }
  });
}


  openPopup(row:any){
    this.popup.open(MealImageComponent, { data: row})
  }
  
cart: any = { cloudKitchenId: null, meals: [] };

addToCart(meal: any, kitchen: any) {
  if (!this.cart.cloudKitchenId) {
    this.cart.cloudKitchenId = kitchen.cloudKitchenId;
  }

  if (this.cart.cloudKitchenId !== kitchen.cloudKitchenId) {
    alert('You can only add items from one cloud kitchen!');
    return;
  }

  const existingMeal = this.cart.meals.find((m: any) => m.mealId === meal.mealId);

  if (existingMeal) {
    existingMeal.quantity += 1; 
  } else {
    this.cart.meals.push({ mealId: meal.mealId, quantity: 1 });
  }

  console.log('Cart updated:', this.cart);

  this.api.addToCart(this.cart).subscribe({
    next: (res) => {
    this.getchCartItems()
    },
   
  });
}
getchCartItems(){
   this.api.viewCart().subscribe((res: any) => {
    this.meals = res.meals;
  });
}

checkIsItemInCart(mealId: number){
  const con= this.meals?.find((meal: any)=> meal.mealId == mealId);
 return con;
}
}