import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitySearchFilterComponent } from './city-search-filter.component';

describe('CitySearchFilterComponent', () => {
  let component: CitySearchFilterComponent;
  let fixture: ComponentFixture<CitySearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitySearchFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitySearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
