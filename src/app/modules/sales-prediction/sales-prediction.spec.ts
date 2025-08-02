import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDatePrediction } from './sales-prediction';

describe('SalesDatePrediction', () => {
  let component: SalesDatePrediction;
  let fixture: ComponentFixture<SalesDatePrediction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesDatePrediction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesDatePrediction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
