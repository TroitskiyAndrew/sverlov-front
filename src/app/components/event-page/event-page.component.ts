import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-event-page',
  imports: [],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.scss'
})
export class EventPageComponent {
  eventId = signal<string | null>(null);
  event = computed(() => {
    const id = this.eventId();
    return id ? this.stateService.eventsMap().get(id) : {};
  });
  reel = computed(() => {
    const event = this.event();
    return event.type === 0 ? 'https://www.instagram.com/reel/DStbYzaCPpW/' : 'https://www.instagram.com/reel/DStbYzaCPpW/';
  });
  description = computed(() => {
    const event = this.event();
    return event.type === 0 ? ` СТЕНДАП-КОНЦЕРТ, где будет отточенный проверенный материал, который
      работает во всех уголках земли` : `СТЕНДАП-НЕТВОРКИНГ - импровизационное шоу Дмитрия Сверлова, где он
      знакомится со зрителями в зале и “на приколе и стёбе” помогает им найти друзей,
      отношения, клиентов, решения проблем`;
  });
  place = computed(() => {
    const event = this.event();
    if(!event) {
      return null;
    }
    return this.stateService.placesMap().get(event.place);
  });


  constructor(private stateService: StateService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.eventId.set(id);
    console.log('Текущее событие', this.event());
  }

  buyTickets() {
    this.router.navigate(['tickets/event', this.event().id]);
  }
}
