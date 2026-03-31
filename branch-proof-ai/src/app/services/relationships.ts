import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RelationshipsService {
  private apiUrl = 'http://localhost:3000/api/relationships';

  constructor(private http: HttpClient) { }

  getRelationships() {
    return this.http.get<any[]>(this.apiUrl);
  }

  addRelationship(rel: any) {
    return this.http.post(this.apiUrl, rel);
  }

  deleteRelationship(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateRelationship(id: string, rel: any) {
    return this.http.put(`${this.apiUrl}/${id}`, rel);
  }
}
