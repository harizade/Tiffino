import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,RouterModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
data:any;

constructor(private api:ApiService){
  this.api.allAvailableMeals().subscribe(res=>{
    this.data= this.flattenMeals(res);
    console.log(this.data);
})


}
 flattenMeals(data:any) {
  return data.flatMap((cuisineObj: any) =>
    cuisineObj.meals.map((meal: any) => ({
      ...meal,
      cuisine: cuisineObj.cuisine
    }))
  );
}
}


