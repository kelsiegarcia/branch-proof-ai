import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationReport } from './validation-report';

describe('ValidationReport', () => {
  let component: ValidationReport;
  let fixture: ComponentFixture<ValidationReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidationReport]
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
