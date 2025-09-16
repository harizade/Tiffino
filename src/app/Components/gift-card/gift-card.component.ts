import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-gift-card',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './gift-card.component.html',
  styleUrl: './gift-card.component.css'
})
export class GiftCardComponent {
 data: any;
giftSentence: string = '';

constructor(private api: ApiService) {}

ngOnInit(): void {
  this.api.userGiftCard().subscribe((res: any) => {
    console.log(res); // ✅ debug API response

    if (res && res.length) {
      const card = res[0];
      this.giftSentence =
        `Your gift card ${card.giftCardCode} gives you a ${card.discountPercent}% ` +
        `discount on the ${card.validForPlan.toLowerCase()} plan. ` +
        `${card.description}`;
    }
  });
}

}
