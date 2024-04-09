import { TestBed } from '@angular/core/testing';

import { BoledoService } from './boledo.service';

describe('BoledoService', () => {
  let service: BoledoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoledoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
