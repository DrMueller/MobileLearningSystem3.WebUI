import { TestBed } from '@angular/core/testing';

import { RequiredErrorMapperService } from './required-error-mapper.service';

describe('RequiredErrorMapperService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
      ]
    }));

  it('should be created', () => {
    const service: RequiredErrorMapperService = TestBed.get(RequiredErrorMapperService);
    expect(service).toBeTruthy();
  });
});
