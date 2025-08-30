import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from './../api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-subscription',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './view-subscription.component.html',
  styleUrl: './view-subscription.component.css'
})
export class ViewSubscriptionComponent {
data:any;

constructor(private api:ApiService){}
ngOnInit(){
  this.api.getAllSubscriptionPlans().subscribe(res=>{
    this.data=res;
    console.log(this.data);
  })
}
}
