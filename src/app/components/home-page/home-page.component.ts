import { Component } from '@angular/core';
import { InstagramReelsCarouselComponent } from "../instagram-reels-carousel/instagram-reels-carousel.component";
import { StateService } from '../../services/state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, InstagramReelsCarouselComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  constructor(public stateService: StateService) { }


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
    console.log('Открыть событие', event);
  }

}
