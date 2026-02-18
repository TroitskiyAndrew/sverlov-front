import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../../services/state.service';
import { InstagramReelsCarouselComponent } from '../instagram-reels-carousel/instagram-reels-carousel.component';
import { TelegrammService } from '../../services/telegramm.service';

@Component({
  selector: 'app-event-page',
  imports: [InstagramReelsCarouselComponent],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.scss'
})
export class EventPageComponent {
  eventId = signal<string | null>(null);
  event = computed(() => {
    const id = this.eventId();
    return id ? this.stateService.eventsMap().get(id) : {};
  });
  reels = computed(() => {
    const event = this.event();
    return event.type === 0 ?
      [
        'https://www.instagram.com/reel/DM34PGNCiwL',
        'https://www.instagram.com/reel/DMiK8mZiRas',
        'https://www.instagram.com/reel/DIaudvavrD0',
        'https://www.instagram.com/reel/DRTMgxXCC28',
      ] :
      [
        'https://www.instagram.com/reel/DRK0KChiABd',
        'https://www.instagram.com/reel/DTiN33FCLu3',
        'https://www.instagram.com/reel/DSu6VgmiAU8',
        'https://www.instagram.com/reel/DStbYzaCPpW',
        'https://www.instagram.com/reel/DQ7q6_LCG5t',
        'https://www.instagram.com/reel/DKiHuBKicUR',
        'https://www.instagram.com/reel/DM5Dwawip3K',
        'https://www.instagram.com/reel/DKFiMa9iXsu',
      ];
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


  constructor(private stateService: StateService, private route: ActivatedRoute, private router: Router, private telegrammService: TelegrammService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.eventId.set(id);
    console.log('Текущее событие', this.event());
  }

  buyTickets() {
    if(this.telegrammService.initData) {
      this.router.navigate(['tickets/event', this.event().id]);
    } else {
      window.open(`https://t.me/sverlov_vietnam_2026_bot?startapp=${this.eventId() || ''}`, '_blank');
    }
  }
}
