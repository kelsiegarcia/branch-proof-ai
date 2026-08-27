import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { RelationshipsService } from './relationships';

describe('RelationshipsService', () => {
  let service: RelationshipsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(RelationshipsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
