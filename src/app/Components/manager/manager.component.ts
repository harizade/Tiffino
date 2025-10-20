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
 value: any;
  isOpen: boolean = false;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.status(); 
  }

  status() {
    this.api.cloudeKitchenData().subscribe({
      next: (res: any) => {
        this.value = res;
        this.isOpen = res?.cloudKitchen?.isOpened ?? false;
        console.log('Cloud Kitchen Status:', this.isOpen ? 'Open' : 'Closed');
      },
      error: (err) => {
        console.error('Error fetching status:', err);
      }
    });
  }

  toggleCloudKitchen() {
    const data = { status: this.isOpen ? 'open' : 'close' };

    this.api.openClosedCloudKitchen(data).subscribe({
      next: (res: any) => {
        console.log(res);
        this.isOpen = !this.isOpen;
        alert(`Cloud Kitchen is now ${this.isOpen ? 'Open' : 'Closed'}`);
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Something went wrong!');
      }
    });
  }


   logout(){
     this.api.adminLOgout();  
   }

}
                                


                                                  