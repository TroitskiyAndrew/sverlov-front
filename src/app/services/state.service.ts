import { computed, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { TelegrammService } from './telegramm.service';

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

  userTickets = signal<any[]>([]);
  loadingUserTickets = false;
  constructor(private apiService: ApiService, private telegrammService: TelegrammService) { }

  updateUserTickets() {
    this.loadingUserTickets = true;
    this.apiService.getTickets().then(tickets => {
      this.userTickets.set(tickets);
      this.loadingUserTickets = false;
      console.log('Мои билеты', tickets);
    });
  }

  async init() {
    console.log('Инициализация данных...');
    const cities = await this.apiService.getCities();
    console.log('Города загружены', cities);
    this.cities.set(cities);
    const places = await this.apiService.getPlaces();
    console.log('Места загружены', places);
    this.places.set(places);
    if(this.telegrammService.initData){
      this.updateUserTickets();
    }
  }
}
