import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-manager-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './manager-login.component.html',
  styleUrl: './manager-login.component.css'
})
export class ManagerLoginComponent {
managerLoginForm:FormGroup;

constructor(private api:ApiService ,private router:Router){
  this.managerLoginForm=new FormGroup({
    emailOrId:new FormControl(),
    password:new FormControl(),
  });
   if(localStorage.getItem('isLoggedIn')){
    this.router.navigate(['/manager'])
  }
}

login(){
  this.api.adminLogin(this.managerLoginForm.value).subscribe((res:any)=>{
      this.router.navigate(["/manager"]);
      localStorage.setItem('token',res.jwtToken);
      localStorage.setItem('isLoggedIn', 'true');
  })
}
}
