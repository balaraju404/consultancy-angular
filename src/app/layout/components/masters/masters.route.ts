import { Routes } from "@angular/router";

export const mastersRoutes: Routes = [
 {
  path: '', loadComponent: () => import("./masters.component").then(m => m.MastersComponent), children: [
   { path: 'tabs', loadComponent: () => import("./tabs/tabs.component").then(m => m.TabsComponent) }
  ]
 }
]