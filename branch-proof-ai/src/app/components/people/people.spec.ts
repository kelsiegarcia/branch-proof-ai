import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { People } from './people';
import { PeopleService } from '../../services/people';

describe('People', () => {
  let component: People;
  let fixture: ComponentFixture<People>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [People],
      imports: [FormsModule],
      providers: [{ provide: PeopleService, useValue: { getPeople: () => of([]) } }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(People);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
