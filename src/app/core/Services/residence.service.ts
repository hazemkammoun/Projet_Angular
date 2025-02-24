import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Residence } from '../models/residence';

@Injectable({ providedIn: 'root' })
export class ResidenceService {
  private residenceUrl = 'http://localhost:3000/residences'; 

  constructor(private http: HttpClient) {}

  getResidences(): Observable<Residence[]> {
    return this.http.get<Residence[]>(this.residenceUrl);
  }

  
  deleteResidence(id: number): Observable<void> {
    return this.http.delete<void>(`${this.residenceUrl}/${id}`);
  }
  

  addResidence(residence: any): Observable<any> {
    return this.http.post(this.residenceUrl, residence);
  }

  updateResidence(id: number, residence: Residence): Observable<Residence> {
    return this.http.put<Residence>(`${this.residenceUrl}/${id}`, residence);
  }

  getResidenceById(id: number): any {
    return this.getResidenceById(id);}
}
