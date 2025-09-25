import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router, RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
import { MatDialog } from '@angular/material/dialog';
import { RattingReviewsComponent } from '../PopUp/ratting-reviews/ratting-reviews.component';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [NavbarComponent,CommonModule,FormsModule,RouterModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
 orders: any[] = [];
last: any;
  route: any;

  constructor(private api: ApiService ,routes:Router,private popup:MatDialog) {
    this.api.getAllOrderUser().subscribe((res: any) => {
      this.orders = res;
    });
  }


 ngOnInit() {
  const id = this.route.snapshot.paramMap.get('orderId');
  console.log('Tracking Order ID:', id);
}

 openPopUp(order: any) {
   const dialog = this.popup.open(RattingReviewsComponent, {
      width: '500px',
      data: { orderId: order } ,
    });
  }
}
