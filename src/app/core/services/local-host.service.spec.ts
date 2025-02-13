import { TestBed } from '@angular/core/testing';

import { LocalHostService } from './local-host.service';

describe('LocalHostService', () => {
  let service: LocalHostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalHostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
