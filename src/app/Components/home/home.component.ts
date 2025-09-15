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
  speed = 0.5;          // pixels per frame
  pauseTime = 5000;  
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
  // Start at 0 so first 6 items are visible
  this.position = 0;
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

    // 👉 Pause when last item is exactly at the right edge
    if (this.position <= -(marqueeWidth - containerWidth)) {
      this.isPaused = true;
      cancelAnimationFrame(this.animationFrameId!);
      this.animationFrameId = null;

      setTimeout(() => {
        // Reset back to start (all items visible again from left)
        this.position = 0;
        this.isPaused = false;
        this.animate();
      }, this.pauseTime);
    } else {
      this.animate(); // keep scrolling
    }
  });
}


  openPopup(row:any){
    this.popup.open(MealImageComponent, { data: row})
  }
}