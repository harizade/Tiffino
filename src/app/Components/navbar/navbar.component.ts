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

  constructor(private api: ApiService, private router: Router) {
    
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
