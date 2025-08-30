import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent {
  addSubscriptionForm : FormGroup;
  constructor(private api:ApiService){
    this.addSubscriptionForm = new FormGroup({
         id: new FormControl ('0'),
         name: new FormControl (''),
         description: new FormControl (''),
         price: new FormControl (''),
         durationType: new FormControl ('')
    })
  }
   
    saveSubscription(){
      this.api.addSubscriptionPlan(this.addSubscriptionForm.value).subscribe({
        next: (res) => {
        console.log('Subscription Plan Added successfully:', res);
        alert('Subscription Plan Inserted successfully!');
        this.addSubscriptionForm.reset();

      },
      error: (err) => {
        console.error('Error Adding Subscription Plan:', err);
        alert('Error Inserting Subscription Plan!');
      },
      })
    }
}
