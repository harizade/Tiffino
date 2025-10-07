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
  imports: [NavbarComponent,CommonModule ,MatDialogModule,MealImageComponent],
  templateUrl: './state-meals.component.html',
  styleUrl: './state-meals.component.css'
})
export class StateMealsComponent {
  cartItems: any[] = [];
  stateName!: string;
  meals: any = [];

  constructor(private route: ActivatedRoute, private api: ApiService ,private router:Router, private popup:MatDialog) {
    
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


  
}


  

