import { Component, Input } from '@angular/core';

@Component({
 selector: 'lib-toast-alert',
 imports: [],
 templateUrl: './alert-toast.component.html',
 styleUrl: './alert-toast.component.scss'
})
export class ToastAlertComponent {
 @Input() toast_mdl!: ToastAlertModel;

 hideToastAlert() {
  this.toast_mdl.hideAlert()
 }
}
export enum ToastAlertType {
 Default = "default",
 Success = "success",
 Danger = "danger",
 Warning = "warning",
 Info = "info"
}
export enum ToastAlertPosition {
 Top_Left = "top-left",
 Top_Right = "top-right",
 Bottom_Left = "bottom-left",
 Bottom_Right = "bottom-right"
}
export class ToastAlertModel {
 public type: ToastAlertType = ToastAlertType.Default;
 public position: ToastAlertPosition = ToastAlertPosition.Top_Right;
 public title: string = "";
 public message: string = "";
 public showClose: boolean = false;
 public autohide: boolean = true;
 public delay: number = 5000;
 public isShow: boolean = false;
 private timeOutId: any;
 constructor() { }
 showToastAlert(type: ToastAlertType, title: string, message: string, showClose: boolean = true, autohide: boolean = true, delay: number = 5000, position: ToastAlertPosition = ToastAlertPosition.Top_Right) {
  this.type = type;
  this.title = title;
  this.message = message;
  this.showClose = showClose;
  this.autohide = autohide;
  this.delay = delay;
  this.position = position;
  this.isShow = true;

  this.clearExistingTimeout();
  if (this.autohide) {
   this.timeOutId = setTimeout(() => this.hideAlert(), this.delay);
  }
 }

 hideAlert() {
  this.isShow = false;
  this.clearExistingTimeout();
 }

 private clearExistingTimeout() {
  if (this.timeOutId) {
   clearTimeout(this.timeOutId);
   this.timeOutId = null;
  }
 }
}
