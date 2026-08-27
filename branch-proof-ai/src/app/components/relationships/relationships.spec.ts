import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { Relationships } from './relationships';
import { RelationshipsService } from '../../services/relationships';

describe('Relationships', () => {
  let component: Relationships;
  let fixture: ComponentFixture<Relationships>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Relationships],
      imports: [FormsModule],
      providers: [{ provide: RelationshipsService, useValue: { getRelationships: () => of([]) } }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Relationships);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
