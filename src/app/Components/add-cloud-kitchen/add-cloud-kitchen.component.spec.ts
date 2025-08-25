import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCloudKitchenComponent } from './add-cloud-kitchen.component';

describe('AddCloudKitchenComponent', () => {
  let component: AddCloudKitchenComponent;
  let fixture: ComponentFixture<AddCloudKitchenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCloudKitchenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCloudKitchenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
