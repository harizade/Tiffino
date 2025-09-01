import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AddManagerComponent } from '../add-manager/add-manager.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule,AddManagerComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(private api:ApiService,private router: Router){

  }
  logout(){
    this.api.adminLOgout();  
  }
}
