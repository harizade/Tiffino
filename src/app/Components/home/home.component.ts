import { Component, AfterViewInit, ViewChild, ElementRef, NgModule } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { MealImageComponent } from '../PopUp/meal-image/meal-image.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterModule, CommonModule, MatDialogModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('container', { static: false }) containerRef!: ElementRef;
  @ViewChild('marquee', { static: true }) marqueeRef!: ElementRef;
  position = 0;
  speed = 1;          // pixels per frame
  pauseTime = 5000;   // 5 seconds
  isPaused = false;
  animationFrameId: number | null = null;
  data: any;

  constructor(private api: ApiService, private popup: MatDialog) {
    this.api.allAvailableMeals().subscribe((res) => {
      this.data = this.flattenMeals(res);
      console.log(this.data);
    });
  }
  flattenMeals(data: any) {
    return data.flatMap((cuisineObj: any) =>
      cuisineObj.meals.map((meal: any) => ({
        ...meal,
        cuisine: cuisineObj.cuisine,
      }))
    );
  }

 ngAfterViewInit() {
    this.position = this.containerRef.nativeElement.offsetWidth; // start from right edge
    this.animate();
  }

  animate() {
    if (this.isPaused || this.animationFrameId !== null) return;

    this.animationFrameId = requestAnimationFrame(() => {
      this.animationFrameId = null;

      this.position -= this.speed;
      this.marqueeRef.nativeElement.style.transform = `translateX(${this.position}px)`;

      const marqueeWidth = this.marqueeRef.nativeElement.scrollWidth;
      const containerWidth = this.containerRef.nativeElement.offsetWidth;

      // Stop when last content is fully visible
      if (this.position <= containerWidth - marqueeWidth) {
        this.isPaused = true;
        setTimeout(() => {
          this.isPaused = false;
          this.animate(); // resume from same position
        }, this.pauseTime);
      } else {
        this.animate(); // continue scrolling
      }
    });
  }

  openPopup(row:any){
    this.popup.open(MealImageComponent, { data: row})
  }
}