import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-cloud-kitchen-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './cloud-kitchen-list.component.html',
  styleUrl: './cloud-kitchen-list.component.css'
})
export class CloudKitchenListComponent {
 data: any;

constructor(private api: ApiService) {
  this.getCloudKitchenList();
}

getCloudKitchenList() {
  this.api.getCloudKitchenList().subscribe((res) => {
    console.log(res);
    this.data = res;
  });
}

delCloudeKitchen(cloudKitchenId: any) {
  if(confirm('Are you sure you want to delete this CloudKitchen?')) {
    this.api.deleteCloudKitchen(cloudKitchenId).subscribe(
      res => {
        alert('CloudKitchen deleted successfully!');
        this.data = this.data.filter((item: { cloudKitchenId: any; }) => item.cloudKitchenId !== cloudKitchenId);
      },
      err => {
        console.error('Error deleting CloudKitchen', err);
      }
    );
  }
}

}
