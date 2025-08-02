import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3Chart } from './d3-chart';

describe('D3Chart', () => {
  let component: D3Chart;
  let fixture: ComponentFixture<D3Chart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D3Chart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D3Chart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
