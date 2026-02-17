import { computed, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  cities = signal<any[]>([]);
  eventsMap = computed(() => {
    const cities = this.cities();
    const eventsMap = new Map<string, any>();
    cities.map(city => city.events).flat().forEach(event => eventsMap.set(event.id, event));
    return eventsMap
  })
  places = signal<any[]>([]);
  placesMap = computed(() => {
    const places = this.places();
    const placesMap = new Map<string, any>();
    places.forEach(place => placesMap.set(place.id, place));
    return placesMap
  })
  constructor(private apiService: ApiService) { }

  async init() {
    const cities = await this.apiService.getCities();
    this.cities.set(cities);
    const places = await this.apiService.getPlaces();
    this.places.set(places);
  }
}
