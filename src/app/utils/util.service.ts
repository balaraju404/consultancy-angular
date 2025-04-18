import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ToastAlertPosition, ToastAlertType } from "../custom-components/alert-toast/alert-toast.component";

@Injectable({
 providedIn: 'root'
})
export class Util {
 static toastAlertSubject = new Subject<any>();
 static showToastAlert(toastType: ToastAlertType, title: string, message: string, showClose: boolean = true, autoHide: boolean = false, delay: number = 5000, position: ToastAlertPosition = ToastAlertPosition.Top_Right) {
  const obj = { toastType, title, message, showClose, autoHide, delay, position }
  this.toastAlertSubject.next(obj)
 }
}