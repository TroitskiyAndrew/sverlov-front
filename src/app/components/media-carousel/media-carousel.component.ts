import {
  Component,
  AfterViewInit,
  ElementRef,
  QueryList,
  ViewChildren,
  ViewChild,
  Input
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MediaItem {
  type: 'image' | 'video';
  src: string;
}

@Component({
  selector: 'app-media-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media-carousel.component.html',
  styleUrls: ['./media-carousel.component.scss']
})
export class MediaCarouselComponent implements AfterViewInit {
  @Input() items: MediaItem[] = [];

  @ViewChildren('videoEl') videos!: QueryList<ElementRef<HTMLVideoElement>>;
  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;

  private observer!: IntersectionObserver;

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const video = entry.target as HTMLVideoElement;

          if (entry.isIntersecting) {
            if (!video.src) {
              video.src = video.dataset['src']!;
              video.load();
            }
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.6
      }
    );

    this.videos.forEach(video => {
      this.observer.observe(video.nativeElement);
    });
  }
  scrollLeft() {
    const width = this.carousel.nativeElement.clientWidth;
    this.carousel.nativeElement.scrollBy({
      left: -width * 0.9,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    const width = this.carousel.nativeElement.clientWidth;
    this.carousel.nativeElement.scrollBy({
      left: width * 0.9,
      behavior: 'smooth'
    });
  }
}
