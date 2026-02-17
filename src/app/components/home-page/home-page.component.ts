import { Component } from '@angular/core';
import { InstagramReelsCarouselComponent } from "../instagram-reels-carousel/instagram-reels-carousel.component";
import { StateService } from '../../services/state.service';
import { EVENT_NAMES } from '../../constants/constants';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, InstagramReelsCarouselComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  eventsNames = EVENT_NAMES

  constructor(public stateService: StateService, private router: Router) { }


  scrollToTour() {
    const element = document.getElementById('tour');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  openEvent(event: any) {
    this.router.navigate(['/event', event.id]);
  }

}
