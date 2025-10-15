import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [NavbarComponent,ReactiveFormsModule,CommonModule,RouterModule,FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
   editProfileForm : FormGroup;

   constructor(private api:ApiService ,private router:Router){
    this.editProfileForm = new FormGroup({
      name:new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z ]+$/)]),
      address:new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z0-9 ,\-]+$/)]),
      mealPreference:new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z ]+$/)]),
      dietaryNeeds:new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z\s-]+$/)]),
    })
   }

  get name() { return this.editProfileForm.get('name')!; }
  get address() { return this.editProfileForm.get('address')!; }
  get mealPreference() { return this.editProfileForm.get('mealPreference')!; }
  get dietaryNeeds() { return this.editProfileForm.get('dietaryNeeds')!; }
   
editUser() {
 
   if (this.editProfileForm.invalid) {
      this.editProfileForm.markAllAsTouched();
      return;
    }

  this.api.editUserProfile(this.editProfileForm.value).subscribe({
    next: (res) => {
      console.log("Updated successfully:", res);

      this.editProfileForm.reset();
       this.router.navigate(['/myProfile']);
    },
    error: (err) => {
      console.error("Error updating User:", err);
    }
  });
}
 }


