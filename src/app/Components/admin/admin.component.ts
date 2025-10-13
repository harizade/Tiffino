import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AddManagerComponent } from '../add-manager/add-manager.component';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule,],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
constructor(private api:ApiService){}

  logout(){
    this.api.adminLOgout();  
  }
}

