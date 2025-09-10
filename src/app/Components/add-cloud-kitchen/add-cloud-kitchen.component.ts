import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
      state:new FormControl(''),
      city:new FormControl(''),
      division:new FormControl(''),
      address:new FormControl(''),
      pinCode:new FormControl('')
    })

  }
  addCloudKitchen(){
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
      // console.log(res)

    })
  }
}
