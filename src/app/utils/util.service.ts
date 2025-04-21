import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ToastAlertPosition, ToastAlertType } from "@balaraju404/custom-components";
import { Constants } from "./constants.service";

@Injectable({
 providedIn: 'root'
})
export class Util {
 static toastAlertSubject = new Subject<any>();
 static loaderSubject = new Subject<any>();
 static onLoginSubject = new Subject<any>();

 static showToastAlert(toastType: ToastAlertType, title: string, message: string, showClose: boolean = true, autoHide: boolean = true, delay: number = 5000, position: ToastAlertPosition = ToastAlertPosition.Top_Right) {
  const obj = { toastType, title, message, showClose, autoHide, delay, position }
  this.toastAlertSubject.next(obj)
 }

 // regex check funs
 static isEmailValid(email: string): boolean {
  return Constants.EMAIL_REGEX.test(email);
 }
 static isMobileValid(mobile: string): boolean {
  return Constants.MOBILE_REGEX.test(mobile);
 }
 static isPasswordValid(password: string): boolean {
  return Constants.PASSWORD_REGEX.test(password);
 }
 static isAlphaNumeric(str: string): boolean {
  return Constants.ALPHANUMERIC_REGEX.test(str);
 }
 static isAlpha(str: string): boolean {
  return Constants.ALPHABET_REGEX.test(str);
 }
 static isNumber(str: string): boolean {
  return Constants.NUMBER_REGEX.test(str);
 }
 static isPositiveNumber(str: string): boolean {
  return Constants.POSITIVE_NUMBER_REGEX.test(str);
 }
 static isPositiveInt(str: string): boolean {
  return Constants.POSITIVE_INT_REGEX.test(str);
 }
}