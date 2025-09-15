import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent,FormsModule, CommonModule, RouterModule, ReactiveFormsModule,MatFormFieldModule,MatSelectModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
 subscriptionFormGroup: FormGroup;
    toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  constructor(){
 this.subscriptionFormGroup = new FormGroup({
    toppings: new FormControl([]) // ✅ use [] for multiple select
  });
  }
}
