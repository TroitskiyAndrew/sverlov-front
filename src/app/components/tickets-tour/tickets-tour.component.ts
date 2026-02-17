import { Component } from '@angular/core';
import { EVENT_NAMES } from '../../constants/constants';
import { StateService } from '../../services/state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tickets-tour',
  imports: [CommonModule],
  templateUrl: './tickets-tour.component.html',
  styleUrl: './tickets-tour.component.scss'
})
export class TicketsTourComponent {

  constructor(public stateService: StateService, private router: Router, private route: ActivatedRoute) { }

  eventsNames = EVENT_NAMES;

  openEvent(event: any) {
    this.router.navigate(['tickets/event', event.id]);
  }

}
