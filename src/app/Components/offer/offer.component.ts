import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterLink],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css'
})
export class OfferComponent {
  offers: any;

constructor(private api: ApiService) {
  this.api.getOffer().subscribe(res => {
    console.log(res);
    this.offers = res;
  });
}
}
