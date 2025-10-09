import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {
   adminForm: FormGroup;

   constructor(private api:ApiService ,private router:Router){
    this.adminForm =new FormGroup({
      adminName : new FormControl ('',[Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z ]+$/)]),
      email : new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
   })
  }
  get adminName() { return this.adminForm.get('adminName')!; }
  get email() { return this.adminForm.get('email')!; }
  get password() { return this.adminForm.get('password')!; }
   

   updateAdmin() {
    if (this.adminForm.invalid) {
      this.adminForm.markAllAsTouched();
      return;
    }
    this.api.updateAdmin(this.adminForm.value).subscribe({
      next: (res) => {
        console.log("Admin updated successfully:", res);

        localStorage.removeItem('authToken');
        localStorage.clear();

        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error("Error updating admin:", err);
      }
    });
  }
}



