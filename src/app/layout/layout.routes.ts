import { Routes } from "@angular/router";

export const layoutRoutes: Routes = [
 {
  path: "", loadComponent: () => import('./layout.component').then(m => m.LayoutComponent), children: [
   { path: "login", loadComponent: () => import("./login/login.component").then(m => m.LoginComponent) },
   { path: "home", loadComponent: () => import("./components/home/home.component").then(m => m.HomeComponent) },

  ]
 },
]