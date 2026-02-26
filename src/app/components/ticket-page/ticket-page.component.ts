import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';
import { TICKET_NAMES } from '../../constants/constants';
import { CommonModule } from '@angular/common';
import { StateService } from '../../services/state.service';

enum TicketStatus {
  NoTicket = 'no-ticket',
  Refound = 'refound',
  Inside = 'inside',
  Default = 'default',
}

@Component({
  selector: 'app-ticket-page',
  imports: [CommonModule],
  templateUrl: './ticket-page.component.html',
  styleUrl: './ticket-page.component.scss'
})
export class TicketPageComponent {

  ticket = signal<any | undefined | null>(undefined);
  ticketNames = TICKET_NAMES;
  TicketStatus = TicketStatus;
  status = computed(() => {
    const ticket = this.ticket();
    if(!ticket){
      return TicketStatus.NoTicket
    }
    if(ticket.refound){
      return TicketStatus.Refound
    }
    return ticket.checked ? TicketStatus.Inside : TicketStatus.Default
  });
  showButton = computed(() => {
    const ticket = this.ticket();
    if(!ticket){
      return false;
    }
    const event = this.stateService.eventsMap().get(ticket.event.id);
    if(!event){
      return false;
    }
    console.log('hasEvent');
    return (event.entrance || []).includes(this.stateService.user().userId)
  });

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService, private stateService: StateService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.apiService.getTicket(id || '').then(ticket => {
      this.ticket.set(ticket);
    })
  }
  back() {
    this.router.navigate(['']);
  }
  async changeStatus(inside: boolean){
    const ticket = this.ticket();
    this.ticket.set(undefined)
    const isUpdated =  await this.apiService.changeTicketStatus(ticket.id, inside);
    if(isUpdated){
      ticket.checked = inside;
    }
    this.ticket.set(ticket);
  }
}
