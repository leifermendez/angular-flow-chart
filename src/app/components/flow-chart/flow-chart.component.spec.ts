import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowChartComponent } from './flow-chart.component';

describe('FlowChartComponent', () => {
  let component: FlowChartComponent;
  let fixture: ComponentFixture<FlowChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
