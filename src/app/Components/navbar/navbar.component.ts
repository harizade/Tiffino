import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
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

  constructor(private api:ApiService){
    
  }
  logout(){
     this.api.adminLOgout(); 
     window.location.reload(); 
   }
}
