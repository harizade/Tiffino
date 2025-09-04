import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [RouterModule,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  userRegisterForm:FormGroup;
  constructor(private api:ApiService ,private router:Router){
    this.userRegisterForm=new FormGroup({
      'name':new FormControl(''),
      'email':new FormControl(''),
      'password':new FormControl(''),
      'phoneNo':new FormControl(''),
    });
  }
   userRegister(){
     this.api.userRegister(this.userRegisterForm.value).subscribe({
      // console.log(res);
      next: (res) => {
        console.log('User Registered successfully:', res);
        alert('User Registered successfully!');
        this.userRegisterForm.reset();
      this.router.navigate(["/login"])

   },
      error: (err) => {
        console.error('Registration failed:', err);
        alert('Registration failed. Please try again.');
      } 
     })

       
   }
  }

  

