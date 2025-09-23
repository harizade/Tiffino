import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignOrderToDeliveryPersonComponent } from './assign-order-to-delivery-person.component';

describe('AssignOrderToDeliveryPersonComponent', () => {
  let component: AssignOrderToDeliveryPersonComponent;
  let fixture: ComponentFixture<AssignOrderToDeliveryPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignOrderToDeliveryPersonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignOrderToDeliveryPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
