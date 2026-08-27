import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { ValidationReport } from './validation-report';
import { PeopleService } from '../../services/people';
import { RecordsService } from '../../services/records';
import { RelationshipsService } from '../../services/relationships';
import { ValidationService } from '../../services/validation';

describe('ValidationReport', () => {
  let component: ValidationReport;
  let fixture: ComponentFixture<ValidationReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidationReport],
      imports: [FormsModule],
      providers: [
        { provide: PeopleService, useValue: { getPeople: () => of([]) } },
        { provide: RecordsService, useValue: { getRecords: () => of([]) } },
        { provide: RelationshipsService, useValue: { getRelationships: () => of([]) } },
        { provide: ValidationService, useValue: { analyzeRelationship: () => of({ analysis: '' }) } },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
