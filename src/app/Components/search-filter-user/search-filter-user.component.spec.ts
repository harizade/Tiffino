import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFilterUserComponent } from './search-filter-user.component';

describe('SearchFilterUserComponent', () => {
  let component: SearchFilterUserComponent;
  let fixture: ComponentFixture<SearchFilterUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFilterUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchFilterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
