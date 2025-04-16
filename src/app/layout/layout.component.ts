import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { RouterModule } from '@angular/router';
import { SideBarComponent } from "./side-bar/side-bar.component";
import { ToastAlertComponent, ToastAlertModel, ToastAlertPosition, ToastAlertType } from '../custom-components/alert-toast/alert-toast.component';

@Component({
 selector: 'app-layout',
 imports: [HeaderComponent, FooterComponent, RouterModule, SideBarComponent, ToastAlertComponent],
 templateUrl: './layout.component.html',
 styleUrls: []
})
export class LayoutComponent {
 isSideBar: boolean = false;
 toast_mdl: ToastAlertModel = new ToastAlertModel()

 ngOnInit() {
  this.toast_mdl.showToastAlert(ToastAlertType.Success, "Test",
   "This is an Test Message to test the Toast Alert Modal - Library",
   true, false, 5000, ToastAlertPosition.Top_Right)
 }
}
