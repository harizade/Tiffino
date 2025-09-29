import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscriber',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscriber.component.html',
  styleUrl: './subscriber.component.css'
})
export class SubscriberComponent {
  subscriber: any[] = [];

constructor(private api: ApiService) {
  this.api.getAllSubscriptionPlans().subscribe((res) => {
    console.log(res);
    this.subscriber = res; 
  });
}

}
