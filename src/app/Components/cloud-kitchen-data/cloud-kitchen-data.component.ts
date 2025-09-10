import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cloud-kitchen-data',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './cloud-kitchen-data.component.html',
  styleUrl: './cloud-kitchen-data.component.css'
})
export class CloudKitchenDataComponent {
data:any;

constructor(private api:ApiService){
  this.api.cloudeKitchenData().subscribe(res=>{
   this.data=res;
     console.log("API Response:", this.data);
})
}
}
