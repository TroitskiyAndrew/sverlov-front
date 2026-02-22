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
      .catch(() => {
        alert('Что-то пошло не так. Напишите в чат с ботом. Напишите в чат с ботом, мы разберемся');
        return []
      })
  }
  async getPlaces(): Promise<any[]> {
    const url = `${environment.backendUrl}/places`;
    return this.http
      .get<any[]>(url)
      .toPromise()
      .then(res => res || [])
      .catch(() => {
        alert('Что-то пошло не так. Напишите в чат с ботом. Напишите в чат с ботом, мы разберемся');
        return []
      })
  }
  async getUser(userId: number): Promise<any | null> {
    const url = `${environment.backendUrl}/users/${userId}`;
    return this.http
      .get<any>(url)
      .toPromise()
      .then(res => res || null)
      .catch(() => {
        alert('Что-то пошло не так. Напишите в чат с ботом. Напишите в чат с ботом, мы разберемся');
        return null
      })
  }
  async byTickets(formData: FormData): Promise<any[]> {
    const url = `${environment.backendUrl}/tickets`;
    return this.http
      .post<any[]>(url, formData)
      .toPromise()
      .then(res => res || [])
      .catch(() => {
        alert('Что-то пошло не так. Напишите в чат с ботом. Напишите в чат с ботом, мы разберемся');
        return []
      });
  }
  async getTickets(): Promise<any[]> {
    const url = `${environment.backendUrl}/tickets`;
    return this.http
      .get<any[]>(url)
      .toPromise()
      .then(res => res || [])
      .catch(() => {
        alert('Что-то пошло не так. Напишите в чат с ботом. Напишите в чат с ботом, мы разберемся');
        return []
      })
  }
  async getTicket(id: string): Promise<any | null> {
    const url = `${environment.backendUrl}/ticket/${id}`;
    return this.http
      .get<any>(url)
      .toPromise()
      .then(res => res || null)
      .catch(() => {
        alert('Что-то пошло не так. Напишите в чат с ботом. Напишите в чат с ботом, мы разберемся');
        return null
      });
  }
  async getEvent(eventId: string): Promise<any | null> {
    const url = `${environment.backendUrl}/event/${eventId}`;
    return this.http
      .get<any>(url)
      .toPromise()
      .then(res => res || null)
      .catch(() => {
        alert('Что-то пошло не так. Напишите в чат с ботом. Напишите в чат с ботом, мы разберемся');
        return null
      });
  }
  async getSales(eventId: string): Promise<any | null> {
    const url = `${environment.backendUrl}/sales/${eventId}`;
    return this.http
      .get<any>(url)
      .toPromise()
      .then(res => res || [])
      .catch(() => {
        alert('Что-то пошло не так. Напишите в чат с ботом. Напишите в чат с ботом, мы разберемся');
        return [null]
      });
  }
  async saveVisit(city: string): Promise<any | null> {
    const url = `${environment.backendUrl}/cities`;
    return this.http
      .post<any>(url, {city})
      .toPromise()
      .then(res => res || null).catch(() => {
        alert('Что-то пошло не так. Напишите в чат с ботом. Напишите в чат с ботом, мы разберемся');
        return null
      });
  }
}
