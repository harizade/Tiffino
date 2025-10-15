import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  userRegisterForm: FormGroup;

  constructor(private api: ApiService, private router: Router) {
    this.userRegisterForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z ]+$/
)]),
      phoneNo: new FormControl('', [Validators.required,Validators.pattern(/^[0-9]{10}$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  get name() { return this.userRegisterForm.get('name')!; }
  get phoneNo() { return this.userRegisterForm.get('phoneNo')!; }
  get email() { return this.userRegisterForm.get('email')!; }
  get password() { return this.userRegisterForm.get('password')!; }

  userRegister() {
    if (this.userRegisterForm.invalid) {
      this.userRegisterForm.markAllAsTouched();
      return;
    }

    this.api.userRegister(this.userRegisterForm.value).subscribe({
      next: (res) => {
        console.log('User Registered successfully:', res);
        alert('User Registered successfully!');
        this.userRegisterForm.reset();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed:', err);
        alert('Registration failed. Please try again.');
      }
    });
  }
}
