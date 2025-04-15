import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { RouterModule } from '@angular/router';
import { SideBarComponent } from "./side-bar/side-bar.component";

@Component({
 selector: 'app-layout',
 imports: [HeaderComponent, FooterComponent, RouterModule, SideBarComponent],
 templateUrl: './layout.component.html',
 styleUrls: []
})
export class LayoutComponent {
  isSideBar:boolean=false;
}
