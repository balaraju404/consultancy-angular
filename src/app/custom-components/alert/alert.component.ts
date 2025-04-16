import { Component, Input } from '@angular/core';
@Component({
 selector: 'lib-alert',
 standalone: true,
 templateUrl: './alert.component.html',
 styleUrl: './alert.component.scss'
})
export class AlertComponent {
 @Input() alert_mdl!: AlertModel;

 onClickAction(choice: number) {
  this.alert_mdl.emitValue = choice;
  this.alert_mdl.isShowAlert = false;

  this.alert_mdl._internalCallback?.(choice === 1);
 }
}
export enum AlertType {
 Alert = 1,
 Confirm = 2
}

export enum AlertStatusType {
 Default = "default",
 Success = "success",
 Danger = "danger",
 Warning = "warning",
 Info = "info"
}

export class AlertModel {
 title = "";
 message = "";
 type: AlertType = AlertType.Alert;
 statusType: AlertStatusType = AlertStatusType.Default;
 isShowAlert = false;
 emitValue = 0; // 1 = OK, 2 = Cancel
 _internalCallback?: (result: boolean | void) => void;

 // ALERT — just show
 static showAlert(model: AlertModel, title: string, message: string) {
  model.title = title;
  model.message = message;
  model.type = AlertType.Alert;
  model.statusType = AlertStatusType.Default;
  model.isShowAlert = true;
 }

 // CONFIRM — returns true/false
 static showConfirm(model: AlertModel, title: string, message: string): Promise<boolean> {
  return new Promise((resolve) => {
   model.title = title;
   model.message = message;
   model.type = AlertType.Confirm;
   model.statusType = AlertStatusType.Default;
   model.isShowAlert = true;
   model._internalCallback = (res) => {
    resolve(res === true);
    delete model._internalCallback;
   };
  });
 }
}
