import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureScaleChartComponent } from './temperature-scale-chart.component';

describe('TemperatureScaleChartComponent', () => {
  let component: TemperatureScaleChartComponent;
  let fixture: ComponentFixture<TemperatureScaleChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemperatureScaleChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemperatureScaleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
