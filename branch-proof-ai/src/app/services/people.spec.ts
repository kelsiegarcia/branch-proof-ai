import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { PeopleService } from './people';

describe('PeopleService', () => {
  let service: PeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(PeopleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
