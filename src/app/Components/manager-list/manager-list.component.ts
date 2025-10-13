import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manager-list.component.html',
  styleUrl: './manager-list.component.css'
})
export class ManagerListComponent {
  manager_list:any;

  constructor(private api:ApiService){
    this.api.getAllManagerList().subscribe(res=>{
      console.log(res);
      this.manager_list = res;
    })
  }

  delManager(managerId: any) {
  if (confirm('Are you sure you want to delete this manager?')) {
    this.api.deleteManager(managerId).subscribe(res => {
      alert('Manager deleted successfully!');
      this.manager_list = this.manager_list.filter((m: any) => m.managerId !== managerId);
    });
  }
}
}
