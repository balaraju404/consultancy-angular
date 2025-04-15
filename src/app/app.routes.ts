import { Routes } from '@angular/router';

export const routes: Routes = [
 { path: "", pathMatch: "full", redirectTo: "/layout" },
 { path: "layout", loadChildren: () => import("./layout/layout.routes").then(m => m.layoutRoutes) },
];
