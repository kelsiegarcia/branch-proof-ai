import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Records {
  private apiUrl = 'http://localhost:3000/people'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  getPeople(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addPerson(person: any) {
    return this.http.post<any>(this.apiUrl, person);
  }

  deletePerson(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // updatePerson(id: string, person: any) {
  //   return this.http.put(`${this.apiUrl}/${id}`, person);
  // }
}