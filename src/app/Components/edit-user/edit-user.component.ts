import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [NavbarComponent,ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
   editProfileForm : FormGroup;

   constructor(private api:ApiService ,private router:Router){
    this.editProfileForm = new FormGroup({
      name:new FormControl(''),
      address:new FormControl(''),
      mealPreference:new FormControl(''),
      dietaryNeeds:new FormControl(''),
    })
   }

// editUser(){
//   this.api.editUserProfile(this.editProfileForm.value).subscribe({
//      next: (res) => {
//         console.log("Updated successfully:", res);
//          this.editProfileForm.reset();

//         this.router.navigate(['/MyProfile']);

//       },
//       error: (err) => {
//         console.error("Error updating User:", err);
//       }
//   })
// }


editUser() {
  this.api.editUserProfile(this.editProfileForm.value).subscribe({
    next: (res) => {
      console.log("Updated successfully:", res);

      this.editProfileForm.reset();

      setTimeout(() => {
        this.router.navigate(['/MyProfile']);
      }, 300);
    },
    error: (err) => {
      console.error("Error updating User:", err);
    }
  });
}







}
