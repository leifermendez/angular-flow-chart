import { TestBed } from '@angular/core/testing';

import { ManagmentStateService } from './managment-state.service';

describe('ManagmentStateService', () => {
  let service: ManagmentStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagmentStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
