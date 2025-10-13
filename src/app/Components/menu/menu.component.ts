import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  data:any;
  constructor(private api:ApiService){
    this.api.addMenu().subscribe((res)=>{
      this.data=res;
      console.log(this.data);
    })
  }

  toggleMeal(meal: any) {
    meal.isSelected = !meal.isSelected;

    this.api.addOrRemoveMeal(meal.mealId).subscribe({
      next: (res: any) => {
        console.log('API success:', res);
      },
      error: (err) => {
        console.error('API error:', err);
        meal.isSelected = !meal.isSelected;
      }
    });
  }
}
