import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPartnerDashbordComponent } from './delivery-partner-dashbord.component';

describe('DeliveryPartnerDashbordComponent', () => {
  let component: DeliveryPartnerDashbordComponent;
  let fixture: ComponentFixture<DeliveryPartnerDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryPartnerDashbordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeliveryPartnerDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
