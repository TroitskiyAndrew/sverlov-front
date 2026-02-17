import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets-page',
  templateUrl: './tickets-page.component.html',
  styleUrl: './tickets-page.component.scss'
})
export class TicketsPageComponent {
  constructor(private router: Router) { }
  goToTour() {
    this.router.navigate(['/tickets', 'tour']);
  }
}
