import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {
 constructor(private api:ApiService,private router: Router){
 
   }
   logout(){
     this.api.adminLOgout();  
   }
}
