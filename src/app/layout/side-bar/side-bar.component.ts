import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { slideLeftInOut } from "../../utils/animate";
import { OutsideClickService } from "../../utils/outside-click.service";
import { Router } from '@angular/router';
@Component({
 selector: 'app-side-bar',
 imports: [CommonModule],
 templateUrl: './side-bar.component.html',
 styleUrls: [],
 animations: [slideLeftInOut]
})
export class SideBarComponent implements OnInit {
 private readonly closeOutsideClick = inject(OutsideClickService)
 private readonly router = inject(Router)

 @Input() isSideBars: boolean = false
 @Output() eventEmitter = new EventEmitter()
 menuList: any = [
  { "title": "Categories", "icon": "fa-solid fa-layer-group", "link": "masters/categories" },
  { "title": "Tabs", "icon": "fa-solid fa-table-cells-large", "link": "masters/tabs" },
  { "title": "Role Wise Tabs", "icon": "fa-solid fa-users-gear", "link": "settings/rws" }
 ]
 selectedMenu: any
 ngOnInit(): void {
  this.outsideclick()
 }
 outsideclick() {
  this.closeOutsideClick.clickOutsideEmitter.subscribe(() => {
   this.closeSidebar()
  })
 }
 closeSidebar() {
  this.isSideBars = false
  this.eventEmitter.emit(this.isSideBars)
 }
 navigateToUrl(item: any) {
  this.router.navigate(["layout", ...item.link.split("/")])
  this.selectedMenu = item
  this.closeSidebar()
 }
}
