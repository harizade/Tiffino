import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent {

  // cart = {
  //   name: '',
  //   description: '',
  //   price: 0,
  //   duration: ''
  // };

  // durations = ['1 Month', '3 Months', '6 Months', '1 Year'];

  // submitForm() {
  //   console.log('Form Data:', this.cart);
  //   alert('Cart submitted successfully!');
  // }
}
