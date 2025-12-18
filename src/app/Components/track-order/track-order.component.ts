import { Component} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-track-order',
  standalone: true,
  imports: [NavbarComponent,CommonModule,RouterModule],
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent  {

orderId!: number;
order: any;

constructor(
  private route: ActivatedRoute,
  private api: ApiService
) {}

ngOnInit(): void {
  this.orderId = Number(this.route.snapshot.paramMap.get('orderId'));

  this.api.trackOrder(this.orderId).subscribe(res => {
    console.log('API RESPONSE:', res);
    this.order = res;
  });
}
}