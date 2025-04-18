import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
 providedIn: 'root'
})

export class ApiService {
 private static readonly http = inject(HttpClient);

 static getApi(url: string) {
  return this.http.get(url)
 }
 static postApi(url: string, data: any) {
  return this.http.post(url, data)
 }
 static putApi(url: string, data: any) {
  return this.http.put(url, data)
 }
 static deleteApi(url: string) {
  return this.http.delete(url)
 }
 static patchApi(url: string, data: any) {
  return this.http.patch(url, data)
 }
 static formPostApi(url: string, data: any) {
  return this.http.post(url, data, { headers: { 'Content-Type': 'multipart/form-data' } })
 }
}