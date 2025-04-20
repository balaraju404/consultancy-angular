import { Routes } from "@angular/router";

export const layoutRoutes: Routes = [
 {
  path: "", loadComponent: () => import('./layout.component').then(m => m.LayoutComponent), children: [
   { path: "", redirectTo: "home", pathMatch: "full" },
   { path: "home", loadComponent: () => import("./components/home/home.component").then(m => m.HomeComponent) },
   { path: "login", loadComponent: () => import("./login/login.component").then(m => m.LoginComponent) },
   { path: "sign-up", loadComponent: () => import("./login/signup/signup.component").then(m => m.SignupComponent) },
   { path: "profile", loadComponent: () => import("./components/profile/profile.component").then(m => m.ProfileComponent) },
   { path: "about", loadComponent: () => import("./components/about/about.component").then(m => m.AboutComponent) },
   { path: "contactus", loadComponent: () => import("./components/contact-us/contact-us.component").then(m => m.ContactUsComponent) },
  ]
 },
]