import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-cuisine',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule,RouterModule],
  templateUrl: './add-cuisine.component.html',
  styleUrl: './add-cuisine.component.css'
})
export class AddCuisineComponent {
addCuisineForm : FormGroup;
  constructor(private api:ApiService){
    this.addCuisineForm = new FormGroup({
         cuisineId: new FormControl ('0'),
         name: new FormControl ('',[Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z]+$/)]),
         description: new FormControl ('',[Validators.required, Validators.minLength(3)]),
         state:new FormControl ('',[Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z]+$/)]),
         cuisinePhoto: new FormControl(null),

    })
  }
  get name() { return this.addCuisineForm.get('name')!; }
  get description() { return this.addCuisineForm.get('description')!; }
  get state() { return this.addCuisineForm.get('state')!; }
   

   onFileSelect(event: any, controlName: string) {
    if (event.target.files.length > 0) {
      this.addCuisineForm.get(controlName)?.setValue(event.target.files[0]);
    }
  }

addCuisine() {
  if (this.addCuisineForm.invalid) {
      this.addCuisineForm.markAllAsTouched();
      return;
    }

  const formData = new FormData();
  formData.append('cuisineId', this.addCuisineForm.get('cuisineId')?.value);
  formData.append('name', this.addCuisineForm.get('name')?.value);
  formData.append('description', this.addCuisineForm.get('description')?.value);
  formData.append('state', this.addCuisineForm.get('state')?.value);

  const file = this.addCuisineForm.get('cuisinePhoto')?.value;
  if (file) {
    formData.append('cuisinePhoto', file);
  }

  this.api.addCuisine(formData).subscribe({
    next: (res) => {
      console.log('Cuisine Added successfully:', res);
      alert(res); 
      this.addCuisineForm.reset();

      const fileInputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
      fileInputs.forEach((input) => (input.value = ''));
    },
    error: (err) => {
      console.error('Error Adding Cuisine:', err);
      alert('Error Inserting Cuisine!');
    },
  });
}
}