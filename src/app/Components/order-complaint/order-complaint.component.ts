import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-complaint',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-complaint.component.html',
  styleUrl: './order-complaint.component.css'
})
export class OrderComplaintComponent {
 complaints:any;

  constructor(private api:ApiService){
    this.api.orderComplaint().subscribe({
      next:(res)=>{
        this.complaints=res;
        console.log(this.complaints);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
