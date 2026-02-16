import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  cities = signal<any[]>([]);

  constructor( private apiService: ApiService) { }

  async init() {
    const cities = await this.apiService.getCities();
    this.cities.set(cities);
    console.log('cities', cities);
  }
}
