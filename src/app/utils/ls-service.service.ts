import { Injectable } from "@angular/core";

@Injectable({
 providedIn: 'root'
})

export class LSService {

 static setItem(key: string, data: any) {
  const encryptedData = window.btoa(data)
  localStorage.setItem(key, encryptedData)
 }
 static getItem(key: string) {
  const encryptedData: string = localStorage.getItem(key) as string
  return window.atob(encryptedData)
 }
 static removeItem(key: string) {
  const encryptedData = localStorage.removeItem(key)
 }
 static clear() {
  localStorage.clear()
 }
}