import { Component, signal } from '@angular/core';
import { TelegrammService } from '../../services/telegramm.service';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-tickets-page',
  imports: [CommonModule],
  templateUrl: './my-tickets-page.component.html',
  styleUrl: './my-tickets-page.component.scss'
})
export class MyTicketsPageComponent {
  tickets = signal<any[]>([]);

  constructor(private apiService: ApiService, private router: Router) {
    this.apiService.getTickets().then(tickets => {
      this.tickets.set(tickets);
      console.log('Мои билеты', tickets);
    });
  }
  back() {
    this.router.navigate([''], { fragment: 'tour' });
  }

}
