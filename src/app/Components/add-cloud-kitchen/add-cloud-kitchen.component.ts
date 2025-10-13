import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-cloud-kitchen',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule,MatSnackBarModule],
  templateUrl: './add-cloud-kitchen.component.html',
  styleUrl: './add-cloud-kitchen.component.css'
})
export class AddCloudKitchenComponent {
  cloudKitchenForm :FormGroup;
  constructor(private api:ApiService){
    this.cloudKitchenForm=new FormGroup({
      state:new FormControl('',[Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z]+$/)]),
      city:new FormControl('',[Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z\s-]+$/)]),
      division:new FormControl('',[Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z\s-]+$/)]),
      address:new FormControl('',[Validators.required, Validators.minLength(3)]),
      pinCode:new FormControl('',[Validators.required,Validators.pattern(/^[0-9]+$/)])
    })

  }
  get state() { return this.cloudKitchenForm.get('state')!; }
  get city() { return this.cloudKitchenForm.get('city')!; }
  get division() { return this.cloudKitchenForm.get('division')!; }
  get address() { return this.cloudKitchenForm.get('address')!; }
  get pinCode() { return this.cloudKitchenForm.get('pinCode')!; }

  addCloudKitchen(){
     
    if (this.cloudKitchenForm.invalid) {
      this.cloudKitchenForm.markAllAsTouched();
      return;
    }

    this.api.addCloudKitchen(this.cloudKitchenForm.value).subscribe({

       next: (res) => {
        console.log('Cloud_Kitchen Added successfully:', res);
        alert('Cloud_Kitchen Inserted successfully!');
        this.cloudKitchenForm.reset();

      },
      error: (err) => {
        console.error('Error Adding Cloud_Kitchen:', err);
        alert('Error Inserting Cloud_Kitchen!');
      },
    })
  }
}
