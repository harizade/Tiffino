import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { RouterModule } from '@angular/router';
import { FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
    name: new FormControl('',[Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z\s-]+$/)]),
    description: new FormControl('',[Validators.required, Validators.minLength(3)]),
    nutritionalInformation: new FormControl('',[Validators.required, Validators.minLength(3)]),
    price: new FormControl('',[Validators.required, Validators.pattern(/^[0-9]+$/)]),
    photos: new FormControl('null'),
    cuisineId: new FormControl(''),
  })

}
  get name() { return this.addMealsForm.get('name')!; }
  get description() { return this.addMealsForm.get('description')!; }
  get nutritionalInformation() { return this.addMealsForm.get('nutritionalInformation')!; }
  get price() { return this.addMealsForm.get('price')!; }
  

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

 if (this.addMealsForm.invalid) {
      this.addMealsForm.markAllAsTouched();
      return;
    }

  const formData = new FormData();

    formData.append('mealId',this.addMealsForm.get('mealId')?.value);
    formData.append('name',this.addMealsForm.get('name')?.value);
    formData.append('description',this.addMealsForm.get('description')?.value);
    formData.append('nutritionalInformation', this.addMealsForm.get('nutritionalInformation')?.value);
    formData.append('price', this.addMealsForm.get('price')?.value);
    formData.append('cuisineId',this.addMealsForm.get('cuisineId')?.value);

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

   