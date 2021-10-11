import { TestBed } from '@angular/core/testing';

import { StateObjectService } from './state-object.service';

describe('StateObjectService', () => {
  let service: StateObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
