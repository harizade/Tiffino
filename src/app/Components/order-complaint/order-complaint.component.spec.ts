import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComplaintComponent } from './order-complaint.component';

describe('OrderComplaintComponent', () => {
  let component: OrderComplaintComponent;
  let fixture: ComponentFixture<OrderComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderComplaintComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
