import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router, RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
import { MatDialog } from '@angular/material/dialog';
import { RattingReviewsComponent } from '../PopUp/ratting-reviews/ratting-reviews.component';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
orderId: number | null = null;
  iframeSrc: SafeResourceUrl | null = null;

  constructor(private api: ApiService ,private router:Router,private popup:MatDialog,private sanitizer: DomSanitizer) {
    this.getOrders();
  }

  
  getOrders(){
     this.api.getAllOrderUser().subscribe((res: any) => {
      this.orders = res;
    });
   
  }

viewInvoice(order: any) {
  this.api.viewInvoice(order.orderId, { responseType: 'blob' }).subscribe({
    next: (res: any) => {
      const file = new Blob([res], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);

      const link = document.createElement('a');
      link.href = fileURL;
      link.download = `invoice.pdf`;
      link.click();

      URL.revokeObjectURL(fileURL);
    },
    error: (err) => {
      const msg = err.error?.message || 'Invoice can only be downloaded after delivery!';
      Swal.fire({
        icon: 'warning',
        title: 'Invoice not available',
        text: msg,
        confirmButtonText: 'OK'
      });
    }
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

cancelOrder(orderId: any) {
  const confirmCancel = confirm('Are you sure you want to cancel this order?');
  
  if (!confirmCancel) {
    return; 
  }

  this.api.CancelOrder(orderId).subscribe({
    next: (res) => {
      console.log('Order cancelled successfully:', res);
      alert('✅ Order cancelled successfully!');
      this.getOrders(); 
    },
    error: (err) => {
      console.error('Error cancelling order:', err);
      alert('❌ Failed to cancel the order. Please try again.');
    }
  });
}

 chatbotVisible = false;

  openChatbot(orderId: number) {
    this.orderId = orderId;
        const url = `http://localhost:9090/index.html?orderId=${orderId}&t=${Date.now()}`;
        this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.chatbotVisible = true;
  }

  closeChatbot() {
    this.chatbotVisible = false;
  }

}

