import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule,NavbarComponent,MatFormFieldModule,MatSelectModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent {
  subscriptionForm: FormGroup;

  constructor(private api:ApiService){
 this.subscriptionForm = new FormGroup({
      durationType: new FormControl(''),
      mealTime: new FormControl('[]'),
      allergies: new FormControl('[]'),
      dietaryFile: new FormControl('null'),
      caloriesPerMeal: new FormControl(''),
      giftCardCodeInput: new FormControl(''),
     
  });
  }

  onFileSelect(event: any, controlName: string) {
    if (event.target.files.length > 0) {
      this.subscriptionForm.get(controlName)?.setValue(event.target.files[0]);
    }
  }




  addSubscription() {
  const formData = new FormData();

  formData.append('durationType', this.subscriptionForm.get('durationType')?.value);

  const mealTimes: string[] = this.subscriptionForm.get('mealTime')?.value || [];
  mealTimes.forEach(time => formData.append('mealTimes', time));

  const allergies: string[] = this.subscriptionForm.get('allergies')?.value || [];
  allergies.forEach(allergy => formData.append('allergies', allergy));

  const file = this.subscriptionForm.get('dietaryFile')?.value;
  if (file) {
    formData.append('dietaryFile', file);
  }

  formData.append('caloriesPerMeal', this.subscriptionForm.get('caloriesPerMeal')?.value);
  formData.append('giftCardCodeInput', this.subscriptionForm.get('giftCardCodeInput')?.value);

  this.api.userSubscription(formData).subscribe({
    next: (res) => {
        console.log(res);
        console.log('Subscribed successfully:', res);
        alert('You Subscribed successfully!');
        this.subscriptionForm.reset();

      },
      error: (err) => {
        console.error('Error Subscribed:', err);
        alert('Error Getting Subscription!');
      }
  });

  const fileInputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
  fileInputs.forEach((input) => (input.value = ''));
}




  }



