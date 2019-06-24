import { TestBed } from '@angular/core/testing';

import { DetallesService } from './detalles.service';

describe('DetallesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetallesService = TestBed.get(DetallesService);
    expect(service).toBeTruthy();
  });
});
