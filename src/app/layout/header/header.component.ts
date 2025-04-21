import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent, ButtonModel, LSService } from '@balaraju404/custom-components';
import { Util } from '../../utils/util.service';
import { Constants } from '../../utils/constants.service';
@Component({
 selector: 'app-header',
 imports: [ButtonComponent],
 templateUrl: './header.component.html',
 styleUrls: []
})
export class HeaderComponent {
 @Input() isSideBars: boolean = false;
 @Output() eventEmitter = new EventEmitter();

 private readonly router = inject(Router)

 headerName: string = "Shashi Consultancy"
 tabsList: any = [
  { "name": "Home", "link": "home" },
  { "name": "About", "link": "about" },
  { "name": "Contact Us", "link": "contactus" },
 ]
 selectedTab: any = {}
 userData: any = {}
 isLogin: boolean = false;
 btn_mdl_login!: ButtonModel;
 ngOnInit() {
  this.userData = LSService.getItem(Constants.LS_USERDATA_KEY) || {};
  if (Object.keys(this.userData).length > 0) this.isLogin = true
  Util.onLoginSubject.subscribe((status: boolean) => {
   this.isLogin = status
  })
  this.setupFields();
  const routeArr = location.href.split("/")
  if (routeArr.length == 5) {
   const lastPath = routeArr[routeArr.length - 1]
   const tab = this.tabsList.find((tab: any) => tab.link == lastPath) || { link: lastPath }
   this.navigateToRoute(tab);
  }
 }
 setupFields() {
  this.btn_mdl_login = new ButtonModel(1, "Login");
 }
 navigateToRoute(item: any) {
  this.selectedTab = item;
  this.router.navigate(["layout", item.link])
 }
 toggleSideBars() {
  this.isSideBars = true;
  this.eventEmitter.emit(this.isSideBars);
 }
}
