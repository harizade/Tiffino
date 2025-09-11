import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule,NavbarComponent],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent {
 
}
