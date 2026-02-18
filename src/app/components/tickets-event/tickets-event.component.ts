import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../../services/state.service';
import { TICKET_NAMES } from '../../constants/constants';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-tickets-event',
  imports: [CommonModule],
  templateUrl: './tickets-event.component.html',
  styleUrl: './tickets-event.component.scss'
})
export class TicketsEventComponent {
  payment: 'VND' | 'RUB' | null = null;
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
  state = signal<any[]>([]);
  totalVND = computed(() => this.state().reduce((sum, item) => sum + item.priceVND, 0));
  totalRub = computed(() => this.state().reduce((sum, item) => sum + item.priceRub, 0));

  initData = false;

  constructor(private stateService: StateService, private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.eventId.set(id);
    console.log('Текущее событие', this.event());


    console.log(window.Telegram?.WebApp);
    console.log('initData:', window.Telegram?.WebApp?.initData);
    if(window.Telegram?.WebApp?.initData) {
      this.initData = true;
    }
  }

  buyTickets(type: 'VND' | 'RUB') {
    this.payment = type;
  }

  downloadQR() {
    const link = document.createElement('a');
    link.href = 'assets/qr.png';
    link.download = 'qr.png';
    link.click();
  }
  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('eventId', this.eventId() || '');
    formData.append('currency', this.payment || '');
    formData.append('tickets', JSON.stringify(this.state().map(ticket => ({ type: ticket.type, price: this.payment === 'VND' ? ticket.priceVND : ticket.priceRub }))));
    await this.apiService.byTickets(formData);
    this.payment = null;
  }

  cancelPayment() {
    this.payment = null;
  }

  getCount(type: number): number {
    return this.state().filter((item: any) => item.type === type).length;
  }

  decrease(ticket: any) {
    const state = this.state();
    const index = state.findIndex(item => item.type === ticket.type);

    if (index !== -1) {
      state.splice(index, 1);
    }
    this.state.set([...state]);
  }
  increase(ticket: any) {
    const state = this.state();
    state.push(ticket);
    console.log('Текущее состояние билетов', state);
    this.state.set([...state]);
  }

}
