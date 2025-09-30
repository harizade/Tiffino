import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  reviews:any;

  constructor(private api:ApiService){
    this.api.getAllCloudeKitchenReview().subscribe(res=>{
      console.log(res);
      this.reviews = res;
    })
  }
}
