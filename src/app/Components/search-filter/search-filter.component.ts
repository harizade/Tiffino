import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.css'
})
export class SearchFilterComponent {
 kitchens: any[] = [];

state: string = '';
city: string = '';
division: string = '';
  
constructor(private api:ApiService){}

 fetchKitchens() {
  const payload = {
    state: [this.state],
    city: [this.city],
    division: [this.division]
  };

  this.api.searchFilterForAdmin(payload).subscribe({
    next: (res) => {
      this.kitchens = res;
      console.log('Kitchens:', this.kitchens);
    },
    error: (err) => {
      console.error('Error:', err);
    }
  });
}

}
