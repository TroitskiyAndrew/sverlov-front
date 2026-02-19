import { Component, signal } from '@angular/core';
import { TelegrammService } from '../../services/telegramm.service';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TICKET_NAMES } from '../../constants/constants';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-my-tickets-page',
  imports: [CommonModule],
  templateUrl: './my-tickets-page.component.html',
  styleUrl: './my-tickets-page.component.scss'
})
export class MyTicketsPageComponent {
  tickets = signal<any[]>([]);
  ticketNames = TICKET_NAMES;
  backUrl = environment.backendUrl;
  loading = true;

  constructor(private apiService: ApiService, private router: Router) {
    this.apiService.getTickets().then(tickets => {
      this.tickets.set(tickets);
      this.loading = false;
      console.log('Мои билеты', tickets);
    });
  }
  back() {
    this.router.navigate(['']);
  }

  openTicket(ticket: any){
    if(!ticket.confirmed){
      return;
    }
    console.log('Открыть билет', ticket);
  }

}
