import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-cloud-kitchen',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
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
    })

  }
  addCloudKitchen(){
    this.api.addCloudKitchen(this.cloudKitchenForm.value).subscribe()
  }
}
