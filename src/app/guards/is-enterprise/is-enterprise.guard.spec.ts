import { TestBed } from '@angular/core/testing';

import { IsEnterpriseGuard } from './is-enterprise.guard';

describe('IsEnterpriseGuard', () => {
  let guard: IsEnterpriseGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsEnterpriseGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
