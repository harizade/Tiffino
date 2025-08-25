import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddManagerComponent } from '../add-manager/add-manager.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule,AddManagerComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
