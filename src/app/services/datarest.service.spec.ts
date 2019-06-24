import { TestBed } from '@angular/core/testing';

import { DatarestService } from './datarest.service';

describe('DatarestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatarestService = TestBed.get(DatarestService);
    expect(service).toBeTruthy();
  });
});
