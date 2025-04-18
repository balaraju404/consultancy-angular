import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent, ButtonModel } from '@balaraju404/custom-components';
@Component({
 selector: 'app-header',
 imports: [ButtonComponent],
 templateUrl: './header.component.html',
 styleUrls: []
})
export class HeaderComponent {
 private readonly router = inject(Router)
 tabsList: any = [
  { "name": "Home", "link": "home" },
  { "name": "About", "link": "about" },
  { "name": "Contact Us", "link": "contactus" },
 ]
 selectedTab: any = {}
 btn_mdl_login!: ButtonModel;
 isLogin: boolean = false;
 @Input() isSideBars: boolean = false;
 @Output() eventEmitter = new EventEmitter();
 ngOnInit() {
  this.setupFields();
  const routeArr = location.href.split("/")
  const lastPath = routeArr[routeArr.length - 1]
  const tab = this.tabsList.find((tab: any) => tab.link == lastPath) || { link: lastPath }
  this.navigateToRoute(tab);
 }
 setupFields() {
  this.btn_mdl_login = new ButtonModel(1, "Login");
 }
 navigateToRoute(item: any) {
  this.selectedTab = item;
  this.router.navigate(["layout", item.link])
 }
 toggleSideBars() {
  this.isSideBars = !this.isSideBars;
  this.eventEmitter.emit(this.isSideBars);
 }
}
