import { TestBed } from '@angular/core/testing';

import { LoginredirectService } from './loginredirect.service';

describe('LoginredirectService', () => {
  let service: LoginredirectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginredirectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
