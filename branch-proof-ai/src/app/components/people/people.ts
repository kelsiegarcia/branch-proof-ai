import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people';

@Component({
  selector: 'app-people',
  templateUrl: './people.html',
  styleUrl: './people.css',
  standalone: false
})
export class People implements OnInit {
  people: any[] = [];

  constructor(private peopleService: PeopleService) { }

  ngOnInit(): void {
    this.peopleService.getPeople().subscribe({
      next: (data) => {
        this.people = data;
        console.log('People from server:', data);
      },
      error: (error) => {
        console.error('Error fetching people:', error);
      }
    });
  }
}