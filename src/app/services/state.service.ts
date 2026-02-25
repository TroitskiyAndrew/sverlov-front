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
  });
  user = signal<any>({userId: 480144364, pressedStart: true});
  isStartPressed = computed(() => this.user().pressedStart);
  isAdmin = computed(() => this.user().admin || false);

  userTickets = signal<any[]>([]);
  loadingUserTickets = false;
  constructor(private apiService: ApiService, private telegrammService: TelegrammService) { }

  updateUserTickets() {
    this.loadingUserTickets = true;
    this.apiService.getTickets().then(tickets => {
      this.userTickets.set(tickets);
      this.loadingUserTickets = false;
    });
  }

  async init() {
    if(this.telegrammService.initData){
      this.updateUserTickets();
      const user = await this.apiService.getUser(this.telegrammService.user?.id || 0);
      this.user.set(user || {});
    }
    const cities = await this.apiService.getCities();
    this.cities.set(cities);
    const places = await this.apiService.getPlaces();
    this.places.set(places);

  }
}
