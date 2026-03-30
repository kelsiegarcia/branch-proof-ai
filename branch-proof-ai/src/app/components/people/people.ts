import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people';

@Component({
  selector: 'app-people',
  templateUrl: './people.html',
  styleUrl: './people.css',
  standalone: false
})
export class People implements OnInit {
  people: any[] = [];
  newPersonName: string = '';

  constructor(
    private peopleService: PeopleService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    console.log('People ngOnInit fired');
    this.loadPeople();
  }

  loadPeople(): void {
    console.log('loadPeople called');

    this.peopleService.getPeople().subscribe({
      next: (data) => {
        console.log('People loaded:', data);
        this.people = data;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading people:', error);
      }
    });
  }

  addPerson(): void {
    if (!this.newPersonName.trim()) return;

    const newPerson = {
      name: this.newPersonName
    };

    this.peopleService.addPerson(newPerson).subscribe({
      next: () => {
        this.newPersonName = '';
        this.loadPeople();
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error adding person:', error);
      }
    });
  }

  deletePerson(id: string): void {
    this.peopleService.deletePerson(id).subscribe({
      next: () => {
        this.loadPeople();
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error deleting person:', error);
      }
    });
  }
}