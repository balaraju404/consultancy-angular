import { Component, inject } from '@angular/core';
import { ButtonComponent, ButtonModel, InputType, TextFieldComponent, TextfieldModel } from '@balaraju404/custom-components';
import { Router } from '@angular/router';
import { fade } from '../../utils/animate';
import { Util } from '../../utils/util.service';
import { ToastAlertType } from '../../custom-components/alert-toast/alert-toast.component';
import { ApiService } from '../../utils/api-service.service';
import { Constants } from '../../utils/constants.service';
@Component({
 selector: 'app-login',
 imports: [TextFieldComponent, ButtonComponent],
 templateUrl: './login.component.html',
 styleUrls: [],
 animations: [fade]
})
export class LoginComponent {
 private readonly router = inject(Router);
 private readonly apiService = inject(ApiService);
 tf_username!: TextfieldModel
 tf_pwd!: TextfieldModel
 btn_login!: ButtonModel
 btn_login_otp!: ButtonModel
 ngOnInit() {
  this.setupFields()
 }
 setupFields() {
  this.tf_username = new TextfieldModel(1, "User Email", "Enter your email")
  this.tf_pwd = new TextfieldModel(2, "Password", "Enter your password", InputType.Password)
  this.btn_login = new ButtonModel(3, "Login")
  this.btn_login.customClass = "btn-dark text-bold"
  this.btn_login_otp = new ButtonModel(4, "Login with OTP")
  this.btn_login_otp.customClass = "btn-muted text-bold"
 }
 toRegistor() {
  this.router.navigate(["layout", "sign-up"]);
 }
 eventHandler(event: any) {
  console.log(event);
  const tag = event["tag"] || 0
  switch (tag) {
   case 3:
    this.checkValidations()
    break;
  }
 }
 checkValidations() {
  let msg = ""
  const email = this.tf_username.selectedValue;
  const password = this.tf_pwd.selectedValue;
  if (email == "") {
   msg = "Please enter email"
  } else if (!Util.isEmailValid(email)) {
   msg = "Please enter valid email"
  } else if (password == "") {
   msg = "Please enter password"
  }
  // else if (!Util.isPasswordValid(password)) {
  //  msg = "Password must be 6-12 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
  // }
  if (msg !== "") {
   Util.showToastAlert(ToastAlertType.Danger, "", msg)
   return
  }
  this.checkLoginWithPwd()
 }
 checkLoginWithPwd() {
  const params = this.getParams()
  this.apiService.postApi(Constants.LOGIN_WITH_PWD_URL, params).subscribe({
   next: (res: any) => {
    if (res["status"]) {
     Util.showToastAlert(ToastAlertType.Success, "", res["msg"])
     this.router.navigate(["layout", "login"])
     this.clearForm()
    } else {
     Util.showToastAlert(ToastAlertType.Danger, "", res["msg"])
    }
   }, error: err => {
    console.log(err);
    const errMsg = err.error["msg"] || "Something went wrong"
    Util.showToastAlert(ToastAlertType.Danger, "", errMsg)

   }
  })
 }
 getParams() {
  return {
   "email": this.tf_username.selectedValue,
   "password": this.tf_pwd.selectedValue,
  }
 }
 clearForm() {
  this.tf_username.selectedValue = ""
  this.tf_pwd.selectedValue = ""
 }
}
