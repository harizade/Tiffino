import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-search-filter-user',
  standalone: true,
  imports: [NavbarComponent,CommonModule,FormsModule,MatFormFieldModule,MatSelectModule,ReactiveFormsModule],
  templateUrl: './search-filter-user.component.html',
  styleUrl: './search-filter-user.component.css'
})
export class SearchFilterUserComponent {
//  Meals: any[] = [];

// cuisineNames: string = '';
// cloudKitchenNames: string = '';
  
// constructor(private api:ApiService){
//    this.fetchKitchens()
// }

//  fetchKitchens() {
//   const payload = {
//     cuisineNames: [this.cuisineNames],
//     cloudKitchenNames: [this.cloudKitchenNames],
//   };

//   this.api.searchFilterUser(payload).subscribe({
//     next: (res) => {
//       this.Meals = res;
//       console.log('Kitchens:', this.Meals);
//     },
//     error: (err) => {
//       console.error('Error:', err);
//     }
//   });
// }



 Meals: any[] = [];
  cuisineNames: string[] = [];
  cloudKitchenNames: string [] = [] ;
  searched = false; // 👈 Flag to control visibility
 
  stateName:any;
  KitchenName:any;
  constructor(private api: ApiService) {
    this.api.getAllStateName().subscribe(res=>{
      console.log(res);
      this.stateName= res;
    })

    this.api.getAllCloudKitchenName().subscribe(res=>{
      console.log(res);
      this.KitchenName= res;
    })
  }

  fetchKitchens() {
    // Mark search as triggered
    this.searched = true;

    const payload = {
       cuisineNames: this.cuisineNames,
      cloudKitchenNames: this.cloudKitchenNames,
    };

    this.api.searchFilterUser(payload).subscribe({
      next: (res: any) => {
        this.Meals = res;
        console.log('Meals found:', this.Meals);
      },
      error: (err) => {
        console.error('Error fetching data:', err);
        this.Meals = []; // reset meals on error
      },
    });
  }
}



