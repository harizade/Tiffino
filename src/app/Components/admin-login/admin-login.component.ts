import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  adminLoginForm:FormGroup;
  
  constructor(private api:ApiService,private router:Router){
    this.adminLoginForm=new FormGroup({
      emailOrId:new FormControl(),
      password:new FormControl(),
    })
    if(localStorage.getItem('isLoggedIn')){
    this.router.navigate(['/admin'])
  }
  }
  login(){
    this.api.adminLogin(this.adminLoginForm.value).subscribe((res:any)=>{
      this.router.navigate(["/admin"])
      localStorage.setItem('token',res.jwtToken);
      localStorage.setItem('isLoggedIn', 'true');
    })
  }
}
