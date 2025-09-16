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

  // durationType
  formData.append('durationType', this.subscriptionForm.get('durationType')?.value);

  // mealTimes (multiple)
  const mealTimes: string[] = this.subscriptionForm.get('mealTime')?.value || [];
  mealTimes.forEach(time => formData.append('mealTimes', time));

  // allergies (multiple)
  const allergies: string[] = this.subscriptionForm.get('allergies')?.value || [];
  allergies.forEach(allergy => formData.append('allergies', allergy));

  // dietaryFile
  const file = this.subscriptionForm.get('dietaryFile')?.value;
  if (file) {
    formData.append('dietaryFile', file);
  }

  // other fields
  formData.append('caloriesPerMeal', this.subscriptionForm.get('caloriesPerMeal')?.value);
  formData.append('giftCardCodeInput', this.subscriptionForm.get('giftCardCodeInput')?.value);

  // API call
  this.api.userSubscription(formData).subscribe(res => {
    console.log(res);
  });

  // Reset file input
  const fileInputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
  fileInputs.forEach((input) => (input.value = ''));
}




  }



