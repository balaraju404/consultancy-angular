import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
 providedIn: 'root'
})
export class OutsideClickService {
 clickOutsideEmitter: EventEmitter<any> = new EventEmitter<any>();
 constructor() {
  this.listenToDocumentClick();
 }

 private listenToDocumentClick() {
  document.addEventListener('click', (event) => {
   const target = event.target as HTMLElement;
   const customCloseElements = document.querySelectorAll('.close-code');
   const clickedInsideCustomClose = Array.from(customCloseElements).some((element) => element.contains(target));
   if (!clickedInsideCustomClose) {
    this.emitClickOutsideEvent();
   }
  });
 }

 emitClickOutsideEvent() {
  this.clickOutsideEmitter.emit();
 }
}
