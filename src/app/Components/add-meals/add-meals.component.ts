import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { RouterModule } from '@angular/router';
import { FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-meals',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-meals.component.html',
  styleUrl: './add-meals.component.css'
})
export class AddMealsComponent {
data:any;
addMealsForm: FormGroup;
constructor(private api:ApiService){
  this.addMealsForm= new FormGroup({
    mealId: new FormControl('0'),
    name: new FormControl(''),
    description: new FormControl(''),
    nutritionalInformation: new FormControl(''),
    price: new FormControl(''),
    photos: new FormControl('null'),
    cuisineId: new FormControl(''),
  })

}
onFileSelect(event: any, controlName: string) {
    if (event.target.files.length > 0) {
      this.addMealsForm.get(controlName)?.setValue(event.target.files[0]);
    }
  }

ngOnInit(){
this.api.getAllCuisines().subscribe((res)=>{
    this.data=res;
    console.log(this.data);
  })
}

saveMeals(){
  const formData = new FormData();

    // Append text fields
    formData.append('mealId',this.addMealsForm.get('mealId')?.value);
    formData.append('name',this.addMealsForm.get('name')?.value);
    formData.append('description',this.addMealsForm.get('description')?.value);
    formData.append('nutritionalInformation', this.addMealsForm.get('nutritionalInformation')?.value);
    formData.append('price', this.addMealsForm.get('price')?.value);
    formData.append('cuisineId',this.addMealsForm.get('cuisineId')?.value);

    // Append files
    formData.append('photos', this.addMealsForm.get('photos')?.value);

    this.api.addMeals(formData).subscribe({
        next: (res) => {
        console.log('Meal Added successfully:', res);
        alert('Meal Inserted successfully!');
        this.addMealsForm.reset();

      },
      error: (err) => {
        console.error('Error Adding Meal:', err);
        alert('Error Inserting Meal!');
      },
    });

    const fileInputs =
      document.querySelectorAll<HTMLInputElement>('input[type="file"]');
    fileInputs.forEach((input) => (input.value = ''));
}
   
}

   