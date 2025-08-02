import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPrediction } from './sales-prediction';

describe('SalesPrediction', () => {
  let component: SalesPrediction;
  let fixture: ComponentFixture<SalesPrediction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesPrediction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesPrediction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
