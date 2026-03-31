import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private apiUrl = 'http://localhost:3000/api/people';

  constructor(private http: HttpClient) { }

  getPeople(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addPerson(person: any) {
    return this.http.post(this.apiUrl, person);
  }

  deletePerson(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updatePerson(id: string, person: any) {
    return this.http.put(`${this.apiUrl}/${id}`, person);
  }

}