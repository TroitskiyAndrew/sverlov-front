import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';

declare global {
  interface Window {
    instgrm: any;
  }
}

@Component({
  selector: 'app-instagram-reels-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instagram-reels-carousel.component.html',
  styleUrl: './instagram-reels-carousel.component.scss'
})
export class InstagramReelsCarouselComponent implements AfterViewInit {
  @Input() reels: string[] = [];
  @Input() short: boolean = false;

  @ViewChild('carousel') carousel!: ElementRef;

  ngAfterViewInit() {
    setTimeout(() => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    }, 100);
  }

scrollLeft() {
  const reelWidth = this.carousel.nativeElement.querySelector('.reel').offsetWidth;
  this.carousel.nativeElement.scrollBy({
    left: -reelWidth - 20, // + gap
    behavior: 'smooth'
  });
}

scrollRight() {
  const reelWidth = this.carousel.nativeElement.querySelector('.reel').offsetWidth;
  this.carousel.nativeElement.scrollBy({
    left: reelWidth + 20,
    behavior: 'smooth'
  });
}
}
