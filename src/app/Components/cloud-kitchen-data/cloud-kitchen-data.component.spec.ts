import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudKitchenDataComponent } from './cloud-kitchen-data.component';

describe('CloudKitchenDataComponent', () => {
  let component: CloudKitchenDataComponent;
  let fixture: ComponentFixture<CloudKitchenDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloudKitchenDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CloudKitchenDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
