import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],

})
export class LoginComponent {
  allLoginForms: FormGroup;
  constructor(private api: ApiService, private router: Router) {
    this.allLoginForms = new FormGroup({
      emailOrId: new FormControl(),
      password: new FormControl(),
    });
  }

  login() {
    this.api.adminLogin(this.allLoginForms.value).subscribe({
      next: (res: any) => {
        if (res.jwtToken != null) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem(
            'token',
            JSON.parse(JSON.stringify(res)).jwtToken
          );
          const role = this.api.getRole();
          if (role === 'SUPER_ADMIN') {
            this.router.navigate(['/admin']);
          } else if (role === 'MANAGER') {
            this.router.navigate(['/manager']);
          }else if (role === 'USER') {
            this.router.navigate(['/'])
          }else if (role === 'DELIVERY_PERSON') {
            this.router.navigate(['/delivery_partner_dashbord'])
          }else {
            this.router.navigate(['/']);
          }
          localStorage.setItem('isLoggedIn', 'true');
        } else {
          alert('Invalid Credentials');
        }
      },
      
      error: (err) => {
        alert('Something went wrong');
      },
    });


   
  

   }
    
}

  

