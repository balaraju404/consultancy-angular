import { Component, inject } from '@angular/core';
import { ApiService, ButtonComponent, ButtonModel, InputType, LSService, TextFieldComponent, TextfieldModel, ToastAlertType } from '@balaraju404/custom-components';
import { Constants } from '../../../utils/constants.service';
import { Router } from '@angular/router';
import { Util } from '../../../utils/util.service';

@Component({
 selector: 'app-profile',
 imports: [TextFieldComponent, ButtonComponent],
 templateUrl: './profile.component.html',
 styleUrls: []
})
export class ProfileComponent {
 private readonly router = inject(Router)
 private readonly apiService = inject(ApiService)

 userData: any = {}
 showFields: any = [
  { "key": "fname", "name": "First Name", "field_key": "tf_fname" },
  { "key": "lname", "name": "Last Name", "field_key": "tf_lname" },
  { "key": "email", "name": "Email", "field_key": "tf_email" },
  { "key": "mobile", "name": "Mobile", "field_key": "tf_mobile" }
 ]
 isEdit: boolean = false

 btn_edit!: ButtonModel
 btn_update!: ButtonModel
 btn_logout!: ButtonModel
 btn_change_pwd!: ButtonModel

 ngOnInit() {
  this.userData = LSService.getItem(Constants.LS_USERDATA_KEY)
  this.setupFeilds();
 }
 setupFeilds() {
  this.showFields.forEach((m: any, index: number) => {
   const tf_mdl = new TextfieldModel(index + 1, "", "", InputType.Text, true)
   m.field_key = tf_mdl;
  });
  console.log(this.showFields);

  this.btn_edit = new ButtonModel(5, "Edit")
  this.btn_edit.customClass = "btn-info"
  this.btn_update = new ButtonModel(6, "Update")
  this.btn_update.customClass = "btn-success"
  this.btn_change_pwd = new ButtonModel(7, "Change Password")
  this.btn_logout = new ButtonModel(8, "Logout")
  this.btn_logout.customClass = "btn-danger"
  if (Object.keys(this.userData).length > 0) this.updateFieldsData()
 }
 updateFieldsData() {
  this.showFields.forEach((field: any) => {
   field.field_key.selectedValue = this.userData[field.key] || "";
  });
 }
 eventHandler(event: any) {
  const tag = event["tag"] || 0
  switch (tag) {
   case 5:
    this.isEdit = true
    this.updateFieldsData()
    break
   case 6:
    this.checkValidations()
    break
  }
 }
 checkValidations() {
  let msg = "";

  const fname = this.getFieldValue("fname");
  const lname = this.getFieldValue("lname");
  const email = this.getFieldValue("email");
  const mobile = this.getFieldValue("mobile");

  if (!fname) {
   msg = "Please enter first name";
  } else if (!lname) {
   msg = "Please enter last name";
  } else if (!email) {
   msg = "Please enter email";
  } else if (!Util.isEmailValid(email)) {
   msg = "Please enter valid email";
  } else if (!mobile) {
   msg = "Please enter mobile number";
  } else if (!Util.isMobileValid(mobile)) {
   msg = "Please enter valid mobile number";
  }

  if (msg !== "") {
   Util.showToastAlert(ToastAlertType.Danger, "", msg);
   return;
  }

  this.updateUserData();
 }

 updateUserData() {
  const params = this.getParams()
  Util.loaderSubject.next(true)
  this.apiService.putApi(Constants.USER_URL, params).subscribe({
   next: (res: any) => {
    Util.loaderSubject.next(false)
    if (res["status"]) {
     Util.showToastAlert(ToastAlertType.Success, "", res["msg"])
     this.getUserData()
     this.isEdit = false
    } else {
     Util.showToastAlert(ToastAlertType.Danger, "", res["msg"])
    }
   }, error: err => {
    Util.loaderSubject.next(false)
    const errMsg = err.error["msg"] || "Something went wrong"
    Util.showToastAlert(ToastAlertType.Danger, "", errMsg)
   }
  })
 }
 getParams() {
  return {
   user_id: this.userData["user_id"],
   fname: this.getFieldValue("fname"),
   lname: this.getFieldValue("lname"),
   email: this.getFieldValue("email"),
   mobile: this.getFieldValue("mobile")
  };
 }
 getFieldValue(key: string): string {
  const field = this.showFields.find((f: any) => f.key === key);
  return field?.field_key?.selectedValue || "";
 }
 getUserData() {
  const params = { "user_id": this.userData["user_id"] }
  Util.loaderSubject.next(true)
  this.apiService.postApi(Constants.USER_DETAILS_URL, params).subscribe({
   next: (res: any) => {
    Util.loaderSubject.next(false)
    if (res["status"]) {
     this.userData = res["data"]?.[0] || {}
     LSService.setItem(Constants.LS_USERDATA_KEY, this.userData)
     this.updateFieldsData()
    } else {
     Util.showToastAlert(ToastAlertType.Danger, "", res["msg"])
    }
   }, error: err => {
    Util.loaderSubject.next(false)
    const errMsg = err.error["msg"] || "Something went wrong"
    Util.showToastAlert(ToastAlertType.Danger, "", errMsg)
   }
  })
 }
 onLogout() {
  LSService.clear()
  Util.onLoginSubject.next(false)
  this.router.navigate(["layout", "login"])
 }
}
