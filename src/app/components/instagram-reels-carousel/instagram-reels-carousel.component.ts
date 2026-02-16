import {
  AfterViewInit,
  Component,
  ElementRef,
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

  @ViewChild('carousel') carousel!: ElementRef;

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
