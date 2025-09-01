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
         description: new FormControl ('')
    })
  }

  addCuisine(){
    this.api.addCuisine(this.addCuisineForm.value).subscribe({
      next: (res) => {
        console.log('Cuisine Added successfully:', res);
        alert('Cuisine Inserted successfully!');
        this.addCuisineForm.reset();

      },
      error: (err) => {
        console.error('Error Adding Cuisine:', err);
        alert('Error Inserting Cuisine!');
      },
    })
  }
}
