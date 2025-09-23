import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assign-order-to-delivery-person',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './assign-order-to-delivery-person.component.html',
  styleUrl: './assign-order-to-delivery-person.component.css'
})
export class AssignOrderToDeliveryPersonComponent {
  // delivery_person:any;
  // constructor(private api:ApiService){
  //   this.api.getDeliveryPerson().subscribe(res=>{
  //   console.log(res);
  //   this.delivery_person =res;
  //  })
  // }
   
}
