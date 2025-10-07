import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateMealsComponent } from './state-meals.component';

describe('StateMealsComponent', () => {
  let component: StateMealsComponent;
  let fixture: ComponentFixture<StateMealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateMealsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StateMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
