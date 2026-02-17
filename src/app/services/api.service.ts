import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {  }
  async getCities(): Promise<any[]> {
    const url = `${environment.backendUrl}/cities`;
    return this.http
      .get<any[]>(url)
      .toPromise()
      .then(res => res || [])
  }
  async getPlaces(): Promise<any[]> {
    const url = `${environment.backendUrl}/places`;
    return this.http
      .get<any[]>(url)
      .toPromise()
      .then(res => res || [])
  }
  async byTickets(formData: FormData): Promise<any[]> {
    const url = `${environment.backendUrl}/tickets`;
    return this.http
      .post<any[]>(url, formData)
      .toPromise()
      .then(res => res || []);
  }
}
