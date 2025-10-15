import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-helps',
  standalone: true,
  imports: [NavbarComponent,CommonModule,RouterModule],
  templateUrl: './helps.component.html',
  styleUrl: './helps.component.css'
})
export class HelpsComponent {

activeIndex: number | null = null;

partnerFaqs = [
  {
    question: 'Help Care Number',
    answer: `  📞 Shidori Kitchen Help Care Number: 080-67466789.`
  },
  {
    question: 'How To Create an Account',
    answer: `<ul>
               <li> Visit our Login Page For Create Account</li>
               <li>Create New Account (First-Time Users)</li>
               <li>Click Sign Up / Register</li>
               <li>Enter: Full Name Email Address,Mobile Number, Password, Confirm Password</li>
              
               <li>Click Register to create your account</li>
             </ul>`
  },
  {
    question: 'How to Place an Order',
    answer: `<ul>
               <li>Visit the Website</li>
               <li> Create an Account (if new user) Click Register. </li>
               <li>Fill in details: name, email, phone number,password.Submit the form to create an account.</li>
               <li>Login (if existing user)</li>
               <li>View categories: Choice of regional or state-based cuisines </li>
               <li>Select a category to see available items.</li>
               <li>Check item details (price, description, image).</li>
               <li>Click Add to Cart.</li>
               <li>View & Edit Cart</li>
               <li>Review selected items, quantities, and total price.</li>
               <li>Update quantity or remove items if needed.</li>
               <li>Confirm delivery address.</li>
               <li>Click Place Order button..</li>
             </ul>`
  },
   {
    question: 'What are Different Subscription Plans ?',
    answer: `<ul>
               <li>One-Time Orders: Users can order a meal just once for immediate delivery without a 
                    subscription. Ideal for sampling a new cuisine. </li>
                    Flexible Subscription Plans
               <li>Single Meal Per Day: Choose between lunch or dinner for a daily 
            delivery.</li>
               <li> Two Meals Per Day: Lunch and dinner delivered daily, perfect for those wanting consistent, 
            all-day meal service.</li>
               <li>  Breakfast, Lunch, and Dinner: Full-day meal service for a complete experience. </li>
               <li>Pause/Resume Subscriptions: Users can pause their subscription while on vacation and 
            resume anytime to ensure flexibility and cost savings. </li>
               <li>Weekly, Bi-Weekly, Monthly Plans: Different payment plans and service durations are 
            available to fit various budgets and commitment levels. </li>
               <li>Customized Payment Plans: Weekly, bi-weekly, monthly, or pay-as-you-go, with easy renewal 
            options.</li>
               
             </ul>`
  },
   {
    question: 'How Can I Edit Profile ?',
    answer: `Visit our Profile Page For Edit Profile:
             <a href="/editUser">Click Here</a> `
  }

];

toggleAccordion(index: number) {
  this.activeIndex = this.activeIndex === index ? null : index;
}

}

 












