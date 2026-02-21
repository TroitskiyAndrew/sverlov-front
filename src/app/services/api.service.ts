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
        alert('Что-то пошло не так. Напишите в чат с ботом. Напишите в чат с ботом, мы разберемся')ж
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
        alert('Что-то пошло не так. Напишите в чат с ботом. Напишите в чат с ботом, мы разберемся')ж
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
        alert('Что-то пошло не так. Напишите в чат с ботом. Напишите в чат с ботом, мы разберемся')ж
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
        alert('Что-то пошло не так. Напишите в чат с ботом. Напишите в чат с ботом, мы разберемся')ж
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
        alert('Что-то пошло не так. Напишите в чат с ботом. Напишите в чат с ботом, мы разберемся')ж
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
        alert('Что-то пошло не так. Напишите в чат с ботом. Напишите в чат с ботом, мы разберемся')ж
        return null
      });
  }
  async getTicketsCount(eventId: string): Promise<any | null> {
    const url = `${environment.backendUrl}/counts/${eventId}`;
    return this.http
      .get<any>(url)
      .toPromise()
      .then(res => res || [])
      .catch(() => {
        alert('Что-то пошло не так. Напишите в чат с ботом. Напишите в чат с ботом, мы разберемся')ж
        return []
      });
  }
  async saveVisit(city: string): Promise<any | null> {
    const url = `${environment.backendUrl}/cities`;
    return this.http
      .post<any>(url, {city})
      .toPromise()
      .then(res => res || null).catch(() => {
        alert('Что-то пошло не так. Напишите в чат с ботом. Напишите в чат с ботом, мы разберемся')ж
        return null
      });
  }
}
