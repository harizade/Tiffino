import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudKitchenListComponent } from './cloud-kitchen-list.component';

describe('CloudKitchenListComponent', () => {
  let component: CloudKitchenListComponent;
  let fixture: ComponentFixture<CloudKitchenListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloudKitchenListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CloudKitchenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
