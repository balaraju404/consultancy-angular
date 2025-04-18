import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { slideLeftInOut } from "../../utils/animate";
import { OutsideClickService } from "../../utils/outside-click.service";
@Component({
 selector: 'app-side-bar',
 imports: [CommonModule],
 templateUrl: './side-bar.component.html',
 styleUrls: [],
 animations: [slideLeftInOut]
})
export class SideBarComponent implements OnInit {
 private readonly closeOutsideClick = inject(OutsideClickService);
 @Input() isSideBars: boolean = false;
 @Output() eventEmitter = new EventEmitter();
 menuList: any = [
  { "title": "Dashboard", "icon":"fa-solid fa-circle-user", "link": "menu1" },
  { "title": "menu1", "icon":"fa-solid fa-user", "link": "menu2" },
  { "title": "menu2fdsf", "icon":"fa-solid fa-pen", "link": "menu3" },
  { "title": "menu3", "icon":"fa-solid fa-list", "link": "men4" },
 ];
 selectedMenu:any;
 ngOnInit(): void {
  this.outsideclick();
  this.selectedMenu = this.menuList[0];
 }
 outsideclick() {
  this.closeOutsideClick.clickOutsideEmitter.subscribe(() => {
   this.isSideBars = false;
   this.eventEmitter.emit(this.isSideBars);
  });
 }
}
