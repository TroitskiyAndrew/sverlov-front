import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';
import { TICKET_NAMES } from '../../constants/constants';

@Component({
  selector: 'app-ticket-page',
  imports: [],
  templateUrl: './ticket-page.component.html',
  styleUrl: './ticket-page.component.scss'
})
export class TicketPageComponent {

  ticket = signal<any | null>(null);
  ticketNames = TICKET_NAMES;
    backUrl = environment.backendUrl
  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.apiService.getTicket(id || '').then(ticket => {
      this.ticket.set(ticket);
    })
  }
  back() {
    this.router.navigate(['']);
  }
}
