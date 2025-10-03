import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
         name: new FormControl (''),
         description: new FormControl (''),
         state:new FormControl (''),
         cuisinePhoto: new FormControl(null),

    })
  }

   onFileSelect(event: any, controlName: string) {
    if (event.target.files.length > 0) {
      this.addCuisineForm.get(controlName)?.setValue(event.target.files[0]);
    }
  }

//   addCuisine(){
//     const formData = new FormData();
   
//     formData.append('cuisineId',this.addCuisineForm.get('cuisineId')?.value);
//     formData.append('name',this.addCuisineForm.get('name')?.value);
//     formData.append('state',this.addCuisineForm.get('state')?.value);
//     formData.append('description',this.addCuisineForm.get('description')?.value);
// const file = this.addCuisineForm.get('cuisinePhoto')?.value;
//   if (file) {
//     formData.append('cuisinePhoto', file);
//   }

//     this.api.addCuisine(formData).subscribe({
//       next: (res) => {
//         console.log('Cuisine Added successfully:', res);
//         alert('Cuisine Inserted successfully!');
//         this.addCuisineForm.reset();

//       },
//       error: (err) => {
//         console.error('Error Adding Cuisine:', err);
//         alert('Error Inserting Cuisine!');
//       },
//     })
//      const fileInputs =
//       document.querySelectorAll<HTMLInputElement>('input[type="file"]');
//     fileInputs.forEach((input) => (input.value = ''));
//   }
// }

addCuisine() {
  if (this.addCuisineForm.invalid) {
    alert('Please fill all required fields!');
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
      alert(res); // backend returns plain text like "Cuisine Inserted Successfully!!"
      this.addCuisineForm.reset();

      // clear file inputs
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