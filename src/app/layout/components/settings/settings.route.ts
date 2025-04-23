import { Routes } from "@angular/router";

export const settingsRoutes: Routes = [
 {
  path: '', loadComponent: () => import("./settings.component").then(m => m.SettingsComponent), children: [
   { path: 'rws', loadComponent: () => import("./role-wise-tabs/role-wise-tabs.component").then(m => m.RoleWiseTabsComponent) },
  ]
 }
]