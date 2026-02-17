import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../../services/state.service';
import { TICKET_NAMES } from '../../constants/constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tickets-event',
  imports: [CommonModule],
  templateUrl: './tickets-event.component.html',
  styleUrl: './tickets-event.component.scss'
})
export class TicketsEventComponent {
  eventId = signal<string | null>(null);
  event = computed(() => {
    const id = this.eventId();
    return id ? this.stateService.eventsMap().get(id) : {};
  });
  tickets = computed(() => {
    const event = this.event();
    return event?.tickets.filter((ticket: any) => ticket.priceVND > 0).reverse() || [];
  })
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
    if (!event) {
      return null;
    }
    return this.stateService.placesMap().get(event.place);
  });

  ticketNames = TICKET_NAMES;
  state = signal({
    totalVND: 0,
    totalRub: 0,
    "0": 0,
    "1": 0,
    "2": 0,
    "3": 0,
    totalCount: 0
  })

  constructor(private stateService: StateService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.eventId.set(id);
    console.log('Текущее событие', this.event());
  }

  buyTickets() {
    console.log('Покупка билетов на событие', this.event());
  }

  getCount(type: number): number {
    return (this.state() as any)[type.toString()];
  }

  decrease(ticket: any) {
    const state = this.state();
    state.totalVND -= ticket.priceVND;
    state.totalRub -= ticket.priceRub;
    state.totalCount -= 1;
    (state as any)[ticket.type.toString()] = (state as any)[ticket.type.toString()] - 1;
    this.state.set(state);
  }
  increase(ticket: any) {
    const state = this.state();
    state.totalVND += ticket.priceVND;
    state.totalRub += ticket.priceRub;
    state.totalCount += 1;
    (state as any)[ticket.type.toString()] = (state as any)[ticket.type.toString()] + 1;
    this.state.set(state);
  }

}
