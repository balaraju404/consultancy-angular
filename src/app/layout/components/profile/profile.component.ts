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
  { "key": "fname", "name": "First Name" },
  { "key": "lname", "name": "Last Name" },
  { "key": "email", "name": "Email" },
  { "key": "mobile", "name": "Mobile" }
 ]
 isEdit: boolean = false

 tf_fname!: TextfieldModel
 tf_lname!: TextfieldModel;
 tf_email!: TextfieldModel;
 tf_mobile!: TextfieldModel;
 btn_edit!: ButtonModel
 btn_update!: ButtonModel
 btn_logout!: ButtonModel
 btn_change_pwd!: ButtonModel

 ngOnInit() {
  this.userData = LSService.getItem(Constants.LS_USERDATA_KEY)
  this.setupFeilds();
 }
 setupFeilds() {
  // this.tf_fname = new TextfieldModel(1, "First Name", "", InputType.Text, true)
  // this.tf_lname = new TextfieldModel(2, "Last Name", "", InputType.Text, true)
  // this.tf_email = new TextfieldModel(3, "Email", "", InputType.Email, true)
  // this.tf_mobile = new TextfieldModel(4, "Mobile", "", InputType.Text, true)
  this.tf_fname = new TextfieldModel(1, "", "", InputType.Text, true)
  this.tf_lname = new TextfieldModel(2, "", "", InputType.Text, true)
  this.tf_email = new TextfieldModel(3, "", "", InputType.Email, true)
  this.tf_mobile = new TextfieldModel(4, "", "", InputType.Text, true)

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
  this.tf_fname.selectedValue = this.userData["fname"] || ""
  this.tf_lname.selectedValue = this.userData["lname"] || ""
  this.tf_email.selectedValue = this.userData["email"] || "";
  this.tf_mobile.selectedValue = this.userData["mobile"] || ""
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
  let msg = ""
  const email = this.tf_email.selectedValue;
  const mobile = this.tf_mobile.selectedValue;
  if (this.tf_fname.selectedValue == "") {
   msg = "Please enter first name"
  } else if (this.tf_lname.selectedValue == "") {
   msg = "Please enter last name"
  } else if (email == "") {
   msg = "Please enter email"
  } else if (!Util.isEmailValid(email)) {
   msg = "Please enter valid email"
  } else if (mobile == "") {
   msg = "Please enter mobile number"
  } else if (!Util.isMobileValid(mobile)) {
   msg = "Please enter valid mobile number"
  }
  if (msg !== "") {
   Util.showToastAlert(ToastAlertType.Danger, "", msg)
   return
  }
  this.updateUserData()
 }
 updateUserData() {
  const params = this.getParams()
  Util.loaderSubject.next(true)
  this.apiService.putApi(Constants.USER_URL, params).subscribe({
   next: (res: any) => {
    Util.loaderSubject.next(false)
    if (res["status"]) {
     Util.showToastAlert(ToastAlertType.Success, "", res["msg"])
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
   "user_id": this.userData["user_id"],
   "fname": this.tf_fname.selectedValue,
   "lname": this.tf_lname.selectedValue,
   "email": this.tf_email.selectedValue,
   "mobile": this.tf_mobile.selectedValue,
  }
 }
 onLogout() {
  LSService.clear()
  Util.onLoginSubject.next(false)
  this.router.navigate(["layout", "login"])
 }
}
