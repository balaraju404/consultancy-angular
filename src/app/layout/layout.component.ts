import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { RouterModule } from '@angular/router';
import { SideBarComponent } from "./side-bar/side-bar.component";
import { ToastAlertComponent, ToastAlertModel } from '../custom-components/alert-toast/alert-toast.component';
import { Util } from '../utils/util.service';

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
  Util.toastAlertSubject.subscribe((obj: any) => {
   if (obj) {
    const { toastType, title, message, showClose, autoHide, delay, position } = obj;
    this.toast_mdl.showToastAlert(toastType, title, message, showClose, autoHide, delay, position)
   }
  })
 }
}
