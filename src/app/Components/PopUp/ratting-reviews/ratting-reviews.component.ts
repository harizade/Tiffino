import { CommonModule } from '@angular/common';
import { Component, Inject, Injector } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../api.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ratting-reviews',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './ratting-reviews.component.html',
  styleUrl: './ratting-reviews.component.css'
})
export class RattingReviewsComponent {
    rating = 0;
  review = '';
  stars = [1, 2, 3, 4, 5];

 constructor(@Inject(MAT_DIALOG_DATA) public data: any,private api:ApiService, private matDialog: MatDialog){
 }
  setRating(value: number) {
    this.rating = value;
  }

  submitReview() {
    if (!this.rating) {
      alert('Please select a star rating!');
      return;
    }
     
    const payload = {
      orderId:this.data.orderId,
      rating: this.rating,
      comment: this.review.trim()
    };
     this.api.ratting_Reviews(payload).subscribe({
        next:()=>{
          this.matDialog.closeAll();
        }
     })
    console.log('Submitting review:', payload);
    

    alert('Thanks! Your review was submitted...');
    this.rating = 0;
    this.review = '';
  }

}

