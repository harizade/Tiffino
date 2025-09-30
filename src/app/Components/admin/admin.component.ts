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
//  kitchens: any[] = [];

// state: string = '';
// city: string = '';
// division: string = '';

constructor(private api:ApiService){}


// fetchKitchens() {
//   const payload = {
//     state: [this.state],
//     city: [this.city],
//     division: [this.division]
//   };

//   this.api.searchFilterForAdmin(payload).subscribe({
//     next: (res) => {
//       this.kitchens = res;
//       console.log('Kitchens:', this.kitchens);
//     },
//     error: (err) => {
//       console.error('Error:', err);
//     }
//   });
// }




  logout(){
    this.api.adminLOgout();  
  }
}

