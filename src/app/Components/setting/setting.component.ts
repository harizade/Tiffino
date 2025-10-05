import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {
   adminForm: FormGroup;

   constructor(private api:ApiService ,private router:Router){
    this.adminForm =new FormGroup({
      adminName : new FormControl (''),
      email : new FormControl(''),
      password: new FormControl('')
   })
  }
   updateAdmin() {
  if (this.adminForm.valid) {
    this.api.updateAdmin(this.adminForm.value).subscribe({
      next: (res) => {
        console.log("Admin updated successfully:", res);

        // Clear token and session (logout)
        localStorage.removeItem('authToken');
        localStorage.clear();

        // Redirect to login
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error("Error updating admin:", err);
      }
    });
  }
}


}
