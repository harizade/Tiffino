import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealImageComponent } from './meal-image.component';

describe('MealImageComponent', () => {
  let component: MealImageComponent;
  let fixture: ComponentFixture<MealImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MealImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
