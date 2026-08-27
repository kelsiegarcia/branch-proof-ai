import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  private apiUrl = '/api/validation/analyze';

  constructor(private http: HttpClient) {}

  analyzeRelationship(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
