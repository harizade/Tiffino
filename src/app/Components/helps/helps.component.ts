import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-helps',
  standalone: true,
  imports: [NavbarComponent,CommonModule,RouterModule],
  templateUrl: './helps.component.html',
  styleUrl: './helps.component.css'
})
export class HelpsComponent {
  activeSection = '';

  showSection(section: string) {
    this.activeSection = section;
  }

  activeQuestion: string = '';

  faqs = [
    { id: 'Care_Number'},
    { id: 'Create_Account'},
    { id: 'Order_Food'},
    { id: 'Subscription_Plan'},
    { id: 'Edit_Profile'},
  ];

  showAnswer(id: string) {
    this.activeQuestion = (this.activeQuestion === id) ? '' : id;
  }













  
}

 












