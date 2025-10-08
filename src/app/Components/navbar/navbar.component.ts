import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,CommonModule,],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn = localStorage.getItem('isLoggedIn');
  giftCard:any;
  offers:any;
  cart:any;
  constructor(private api: ApiService, private router: Router) {
    this.api.userGiftCard().subscribe((res:any)=>{
       this.giftCard = res.length;
    })

    this.api.getOffer().subscribe((res:any)=>{
      this.offers = res=="No offers available for you today."?  false : true;
    })
    this.viewCart();
    this.api.cartCount.subscribe(res=>{
      if(res){
        this.viewCart();
      }
    })
   
  }

  viewCart(){
 this.api.viewCart().subscribe((res:any)=>{
      this.cart = res.meals.length;
    })
  }
  logout() {
  this.api.userLOgout().subscribe({
    next: (res) => {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('token');
      this.router.navigate(['/']).then(() => {
        window.location.reload(); 
      });
    },
    error: (err) => {
      console.error('Logout failed', err);
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    }
  });
}

}
