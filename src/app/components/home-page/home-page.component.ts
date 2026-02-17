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

  eventsNames = EVENT_NAMES;
  reels = [
    'https://www.instagram.com/reel/CqaGVL1JO5n/',
    'https://www.instagram.com/reel/CrjFZ-XrOrX/',
    'https://www.instagram.com/reel/Cuhat7ENbyq/',
    'https://www.instagram.com/reel/CsWgk6NNrNS/',
    'https://www.instagram.com/reel/Cyln9SUN6Ay',
    'https://www.instagram.com/reel/C2iJURyiGEY',
    'https://www.instagram.com/reel/C2nbgkqC-Sd',
    'https://www.instagram.com/reel/C5ky-ACvAnn',
    'https://www.instagram.com/reel/DAbuZSZicBj',
    'https://www.instagram.com/reel/DARC8faCK_o',
    'https://www.instagram.com/reel/DBJVmt0C8gy',
    'https://www.instagram.com/reel/DDWp2eYCyi5',
    'https://www.instagram.com/reel/DIdGDfIiEjC',
    'https://www.instagram.com/reel/DOym13rCC4I',
    'https://www.instagram.com/reel/DPw3vGViDTz',
    'https://www.instagram.com/reel/DRhtVmqCIGP',
    'https://www.instagram.com/reel/DKFiMa9iXsu',
    'https://www.instagram.com/reel/Cwvb8Z9NeJR',
    'https://www.instagram.com/reel/CyTyrWlNNOs',
  ];

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
