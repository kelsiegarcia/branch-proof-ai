import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class RecordsService {
  private apiUrl = '/api/records';

  constructor(private http: HttpClient) { }

  getRecords(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addRecord(record: any): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl, record);
  }

  deleteRecord(id: string): Observable<any[]> {
    return this.http.delete<any[]>(`${this.apiUrl}/${id}`);
  }

  updateRecord(id: string, record: any): Observable<any[]> {
    return this.http.put<any[]>(`${this.apiUrl}/${id}`, record);
  }
}
