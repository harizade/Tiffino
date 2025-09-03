import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user-subscription',
  standalone: true,
  imports: [NavbarComponent,CommonModule,RouterModule],
  templateUrl: './user-subscription.component.html',
  styleUrl: './user-subscription.component.css'
})
export class UserSubscriptionComponent {
data:any;
constructor(private api:ApiService){
  this.api.userSubscription().subscribe(res=>{
    this.data =res;
    console.log(res);
})
}
}