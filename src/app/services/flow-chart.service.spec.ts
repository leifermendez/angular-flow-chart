import { TestBed } from '@angular/core/testing';

import { FlowChartService } from './flow-chart.service';

describe('FlowChartService', () => {
  let service: FlowChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
