import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { RecordsService } from './records';

describe('RecordsService', () => {
  let service: RecordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(RecordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
