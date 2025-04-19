import { Component } from '@angular/core';
import { ImageSliderComponent, ImageSliderModal } from "../../../custom-components/image-slider/image-slider.component";

@Component({
 selector: 'app-home',
 imports: [ImageSliderComponent],
 templateUrl: './home.component.html',
 styleUrls: []
})
export class HomeComponent {
 images: string[] = [
  'assets/images/img-1.jpg',
  'assets/images/img-2.jpg',
  'assets/images/img-1.jpg',
  'assets/images/img-2.jpg',
 ];
 announcements_mdl!: ImageSliderModal
 constructor() { }
 ngOnInit(): void {
  this.announcements_mdl = new ImageSliderModal(this.images);
 }
}
