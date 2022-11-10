import { TestBed } from '@angular/core/testing';

import { MonobankService } from './monobank.service';

describe('MonobankService', () => {
  let service: MonobankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonobankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
