import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../../services/state.service';
import { TICKET_NAMES } from '../../constants/constants';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';

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
  otherEvents = computed(() => {
    function toMilliseconds(dateStr: string): number {
      const [day, month, year] = dateStr.split('.').map(Number);

      const date = new Date(year, month - 1, day); // месяц с 0
      return date.getTime();
    }
    function toMillisecondsToday(): number {
      const today = new Date();

      const todayDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        0, 0, 0, 0
      );

      return todayDate.getTime();
    }
    const event = this.event();
    const cities = this.stateService.cities();
    console.log('Города из state', cities);
    const city = this.stateService.cities().find(city => city.id === event.city);
    const otherEvents = city ? city.events.filter((e: any) => e.type !== event.type && toMilliseconds(e.date) >= toMillisecondsToday()) : [];
    return otherEvents;
  })

  ticketNames = TICKET_NAMES;
  state = signal<any[]>([]);
  totalVND = computed(() => this.state().reduce((sum, item) => sum + item.priceVND, 0) * (this.selectedOtherEvent() ? 1.8 : 1));
  totalRub = computed(() => this.state().reduce((sum, item) => sum + item.priceRub, 0) * (this.selectedOtherEvent() ? 1.8 : 1));
  showInfo = false;
  phone = environment.phone;


  constructor(public stateService: StateService, private route: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  imageLoaded = signal(false);

  onImageLoad() {
    this.imageLoaded.set(true);
  }

  onImageError() {
    this.imageLoaded.set(true); // чтобы лоадер не крутился вечно
  }

  selectedOtherEvent = signal<any | null>(null);

  selectOtherEvent(event: any) {
    if (this.selectedOtherEvent()?.id === event.id) {
      this.selectedOtherEvent.set(null); // снять выбор
    } else {
      this.selectedOtherEvent.set(event);
    }
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.eventId.set(id);
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

  copyPhone() {
    navigator.clipboard.writeText(this.phone).then(() => {
      alert('Номер телефона скопирован в буфер обмена!');
    })
  }
  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('currency', this.payment || '');
    const tickets = this.state().map(ticket => ({ eventId: ticket.eventId, type: ticket.type, price: this.payment === 'VND' ? ticket.priceVND : ticket.priceRub }));
    const otherEvents = this.selectedOtherEvent();
    if (otherEvents) {
      tickets.push(...tickets.map(ticket => ({ ...ticket, eventId: otherEvents.id, price: ticket.price * 0.8 })))
    }
    formData.append('tickets', JSON.stringify(tickets));
    this.payment = null;
    this.showInfo = true;
    await this.apiService.byTickets(formData);
  }

  cancelPayment() {
    this.payment = null;
  }

  back() {
    this.router.navigate([''], { fragment: 'tour' });
  }
  myTickets() {
    this.router.navigate(['my-tickets']);
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
    ticket.eventId = this.eventId();
    const state = this.state();
    state.push(ticket);
    console.log('Текущее состояние билетов', state);
    this.state.set([...state]);
  }

}
