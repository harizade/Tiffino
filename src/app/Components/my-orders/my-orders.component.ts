import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [NavbarComponent,CommonModule,FormsModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
//  data:any;

//  constructor(private api:ApiService){
//   this.api.getAllOrderUser().subscribe(res=>{
//     console.log(res);
//     this.data = res;
//   })
//  }



 orders: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getAllOrderUser().subscribe((res: any) => {
      this.orders = res;
    });
  }

}
