import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../api.service';
import { routes } from '../../app.routes';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-track-order',
  standalone: true,
  imports: [NavbarComponent,CommonModule,RouterModule],
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.css'
})
export class TrackOrderComponent {
 orderId!: number;
  orderStatus!: string;
  orderData:any;

  constructor(private route:ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    this.orderId = +this.route.snapshot.paramMap.get('orderId')!;
    this.loadOrder();
  }

  loadOrder() {
    this.api.trackOrder(this.orderId).subscribe(res=>{
      console.log(res);
      this.orderData = res;
    });
  }
}
   

