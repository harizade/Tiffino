import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [NavbarComponent,CommonModule,FormsModule,RouterModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent{
  data: any;   

  constructor(private api: ApiService) {
    this.api.viewProfile().subscribe(res=>{
      console.log(res);
      this.data =res;
    
    });
  }
}

