import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gift-card',
  standalone: true,
  imports: [NavbarComponent,CommonModule,RouterModule,FormsModule],
  templateUrl: './gift-card.component.html',
  styleUrl: './gift-card.component.css'
})
export class GiftCardComponent {
 data: any;
giftCards: any[] = [];

constructor(private api: ApiService) {}
ngOnInit(): void {
  this.api.userGiftCard().subscribe((res: any) => {
    console.log(res);
    if (res && res.length) {
      this.giftCards = res;
    }
  });
}
}