import { Component, Input } from '@angular/core';

@Component({
 selector: 'lib-image-slider',
 templateUrl: './image-slider.component.html',
 styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent {
 @Input() img_slider_mdl!: ImageSliderModal;

 private autoplayIntervalID: any;
 private touchStartX = 0;
 private touchEndX = 0;

 ngOnInit() {
  if (this.img_slider_mdl?.isAutoPlay) {
   this.startAutoplay();
  }
 }

 ngOnDestroy() {
  this.stopAutoplay();
 }

 startAutoplay() {
  this.autoplayIntervalID = setInterval(() => {
   this.nextSlide();
  }, this.img_slider_mdl!.autoplayInterval);
 }

 stopAutoplay() {
  if (this.autoplayIntervalID) {
   clearInterval(this.autoplayIntervalID);
  }
 }

 nextSlide() {
  const total = this.img_slider_mdl.images.length;
  this.img_slider_mdl.currentIndex = (this.img_slider_mdl.currentIndex + 1) % total;
 }

 goToSlide(index: number) {
  this.img_slider_mdl.currentIndex = index;
 }

 onTouchStart(event: TouchEvent) {
  this.touchStartX = event.changedTouches[0].screenX;
 }

 onTouchEnd(event: TouchEvent) {
  this.touchEndX = event.changedTouches[0].screenX;
  this.handleSwipe();
 }

 handleSwipe() {
  const swipeThreshold = 50;
  const diff = this.touchEndX - this.touchStartX;

  if (Math.abs(diff) > swipeThreshold) {
   if (diff > 0) {
    this.img_slider_mdl.currentIndex =
     (this.img_slider_mdl.currentIndex - 1 + this.img_slider_mdl.images.length) %
     this.img_slider_mdl.images.length;
   } else {
    this.nextSlide();
   }
  }
 }
}

export class ImageSliderModal {
 public images: string[] = [];
 public currentIndex: number = 0;
 public isAutoPlay: boolean = true;
 public autoplayInterval: number = 5000;

 constructor(images: string[] = [], isAutoPlay: boolean = true, autoplayInterval: number = 5000) {
  this.images = images;
  this.isAutoPlay = isAutoPlay;
  this.autoplayInterval = autoplayInterval;
 }
}
