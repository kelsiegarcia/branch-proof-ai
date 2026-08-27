import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { Records } from './records';
import { RecordsService } from '../../services/records';

describe('Records', () => {
  let component: Records;
  let fixture: ComponentFixture<Records>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Records],
      imports: [FormsModule],
      providers: [{ provide: RecordsService, useValue: { getRecords: () => of([]) } }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Records);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
