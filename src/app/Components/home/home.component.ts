import { Component, AfterViewInit, ViewChild, ElementRef, NgModule } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { MealImageComponent } from '../PopUp/meal-image/meal-image.component';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterModule, CommonModule, MatDialogModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit {
  [x: string]: any;
  @ViewChild('container', { static: false }) containerRef!: ElementRef;
  @ViewChild('marquee', { static: true }) marqueeRef!: ElementRef;
  position = 0;
  speed = 0.5;          
  pauseTime = 5000;  
  isPaused = false;
  animationFrameId: number | null = null;
  data: any;
  meals: any;
  allCuisine:any;


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
  constructor(private api: ApiService, private popup: MatDialog ,private router:Router,private dailog:MatDialog) {
    this.api.allAvailableMeals().subscribe((res) => {
      this.data = this.flattenMeals(res);
      console.log(this.data);
    });
    this.getchCartItems();
    this.getCuisine();
  }
  

ngAfterViewInit() {
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
  if (!this.cart) {
    this.cart = { cloudKitchenId: null, meals: [] };
  }

  if (!this.cart.cloudKitchenId) {
    this.cart.cloudKitchenId = kitchen.cloudKitchenId;
  }

  if (this.cart.cloudKitchenId !== kitchen.cloudKitchenId) {
    alert('You can only add items from one cloud kitchen at a time!');
    return;
  }

  const existingMeal = this.cart.meals.find(
    (m: any) => m.mealId === meal.mealId && m.cloudKitchenId === kitchen.cloudKitchenId
  );

  if (existingMeal) {
    existingMeal.quantity += 1;
  } else {
    this.cart.meals.push({
      mealId: meal.mealId,
      mealName: meal.mealName,
      quantity: 1,
      finalPrice: meal.finalPrice,
      photos: meal.photos,
      cloudKitchenId: kitchen.cloudKitchenId,
      cloudKitchenName: kitchen.cloudKitchenName
    });
  }

  console.log('Cart updated:', this.cart);

  this.api.addToCart(this.cart).subscribe({
    next: (res) => {
      this.getchCartItems();
      this.api.cartCount.next(true);
    },
    error: (err) => {
      console.error('Error adding to cart:', err);
    }
  });
}

getchCartItems(){
   this.api.viewCart().subscribe((res: any) => {
    this.meals = res;
  });
}

checkIsItemInCart(mealId: number, cloudKitchenId: string): boolean {
  if (!this.meals || !this.meals) return false;

  return this.meals.meals.some(
    (m: any) => m.mealId === mealId && this.meals.cloudKitchenId === cloudKitchenId
  );
}




getdata(stateName: string) {
  this.router.navigate(['/StateMeals', stateName]);
}

 getCuisine(){
  this.api.getAllCuisinesUser().subscribe(res=>{
    console.log(res);
    this.allCuisine = res;
  })
 }

openChat(){
   this.dailog.open(ChatComponent,{
   width: '420px',
    height: '550px',
    panelClass: 'chat-dialog',
   position: {
      right: '70px',
      bottom: '10px'
    }
  })
}


}