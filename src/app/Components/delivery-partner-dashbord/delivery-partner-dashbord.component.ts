import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-delivery-partner-dashbord',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './delivery-partner-dashbord.component.html',
  styleUrl: './delivery-partner-dashbord.component.css'
})
export class DeliveryPartnerDashbordComponent {

}
