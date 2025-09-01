import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from './../api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-view-subscription',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, NavbarComponent ],
  templateUrl: './view-subscription.component.html',
  styleUrl: './view-subscription.component.css'
})
export class ViewSubscriptionComponent {
data:any;
isAdmin:boolean=false;
constructor(private api:ApiService, private router: Router){
  this.isAdmin=this.router.url.includes('admin');
}
ngOnInit(){
  this.api.getAllSubscriptionPlans().subscribe(res=>{
    this.data=res;
    console.log(this.data);
  })
}
deleteSubscription(id:any){
  if(confirm("Are you sure to delete this subscription plan?")){
    this.api.deleteSubscriptionPlan(id).subscribe(res=>{
      alert(res);
      this.data=this.data.filter((item:any)=>item.subId !== id);
    })
  }
}
}
