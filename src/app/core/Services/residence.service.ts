import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Residence } from '../models/residence';

@Injectable({ providedIn: 'root' })
export class ResidenceService {
  residenceUrl = 'app-residences'; // URL de l'API

  constructor(private http: HttpClient) { }

  // Récupérer toutes les résidences (READ)
  getResidences(): Observable<Residence[]> {
    return this.http.get<Residence[]>(this.residenceUrl);
  }

  // Supprimer une résidence (DELETE)
  deleteResidence(id: number): Observable<void> {
    return this.http.delete<void>(`${this.residenceUrl}/${id}`);
  }

  // Ajouter une résidence (CREATE)
  addResidence(residence: Residence): Observable<Residence> {
    return this.http.post<Residence>(this.residenceUrl, residence);
  }

  // Mettre à jour une résidence (UPDATE)
  updateResidence(id: number, residence: Residence): Observable<Residence> {
    return this.http.put<Residence>(`${this.residenceUrl}/${id}`, residence);
  }
}