import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';


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
    formData.append('dietaryFilePath', file);
  }

  formData.append('caloriesPerMeal', this.subscriptionForm.get('caloriesPerMeal')?.value);
   const giftCard = this.subscriptionForm.get('giftCardCodeInput')?.value;
  if (giftCard) {
    formData.append('giftCardCodeInput', giftCard); 
  }

this.api.userSubscription(formData).subscribe({
  next: (res: any) => {
    console.log('Subscribed successfully:', res);

    Swal.fire({
      title: `<span style="color:#28a745; font-weight:700;">${res.message}</span>`,
      html: `
        <div style="text-align:left; font-size:15px; line-height:1.6;">
          <p><b>Plan Type:</b> <span style="color:#28a745;">${res.subscription.planType}</span></p>
          <p><b>Original Price:</b> <del>₹${res.subscription.originalPrice}</del></p>
          <p><b>Discount Applied:</b> <span style="color:#28a745; font-weight:600;">${res.subscription.appliedDiscountPercent}% OFF</span></p>
          <p><b>Final Price:</b> 
            <span style="color:#155724; font-size:18px; font-weight:700;">₹${res.subscription.finalPrice}</span>
          </p>
          <hr style="margin:10px 0; border-top:1px solid #ccc;">
          <p><b>Start Date:</b> ${new Date(res.subscription.startDate).toLocaleDateString()}</p>
          <p><b>Expiry Date:</b> ${new Date(res.subscription.expiryDate).toLocaleDateString()}</p>
        </div>
      `,
      icon: 'success',
      iconColor: '#28a745',
      background: '#f6fff8',
      showConfirmButton: true,
      confirmButtonText: '🎉 Awesome!',
      confirmButtonColor: '#28a745',
      customClass: {
        popup: 'animated fadeInDown'
      }
    });

    this.subscriptionForm.reset();
    const fileInputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
    fileInputs.forEach((input) => (input.value = ''));
  },
  error: (err) => {
    console.error('Error Subscribed:', err);
    Swal.fire('Error', 'Error Getting Subscription!', 'error');
  }
});


  const fileInputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
  fileInputs.forEach((input) => (input.value = ''));
}

  }


  

