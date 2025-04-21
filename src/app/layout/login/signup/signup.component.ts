import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent, ButtonModel, InputType, TextFieldComponent, TextfieldModel, fade, ToastAlertType, ApiService } from '@balaraju404/custom-components';
import { Util } from '../../../utils/util.service';
import { Constants } from '../../../utils/constants.service';

@Component({
 selector: 'app-signup',
 imports: [TextFieldComponent, ButtonComponent],
 templateUrl: './signup.component.html',
 styleUrls: [],
 animations: [fade()]
})
export class SignupComponent implements OnInit {
 private readonly router = inject(Router);
 private readonly apiService = inject(ApiService);
 tf_firstname!: TextfieldModel;
 tf_lastname!: TextfieldModel;
 tf_email!: TextfieldModel;
 tf_mobile!: TextfieldModel;
 tf_password!: TextfieldModel;
 tf_confirm_password!: TextfieldModel;
 btn_register!: ButtonModel;
 ngOnInit() {
  this.setUpFields();
 }
 setUpFields() {
  this.tf_firstname = new TextfieldModel(1, "First Name", "Enter first name", InputType.Text);
  this.tf_lastname = new TextfieldModel(2, "Last Name", "Enter last name", InputType.Text);
  this.tf_email = new TextfieldModel(3, "Email", "Enter email", InputType.Email);
  this.tf_mobile = new TextfieldModel(4, "Mobile", "Enter mobile number", InputType.Text);
  this.tf_password = new TextfieldModel(5, "New Password", "Enter password", InputType.Password);
  this.tf_confirm_password = new TextfieldModel(6, "Confirm Password", "Enter Confirm password", InputType.Text);
  this.btn_register = new ButtonModel(7, "Register");
  this.btn_register.customClass = "btn-dark text-bold";
 }
 toLogin() {
  this.router.navigate(["layout", "login"]);
 }
 eventHandler(event: any) {
  const tag = event["tag"] || 0
  switch (tag) {
   case 7:
    this.checkValidations()
    break;
  }
 }
 checkValidations() {
  let msg = ""
  const email = this.tf_email.selectedValue;
  const mobile = this.tf_mobile.selectedValue;
  const password = this.tf_password.selectedValue;
  const confirmPassword = this.tf_confirm_password.selectedValue;
  if (this.tf_firstname.selectedValue == "") {
   msg = "Please enter first name"
  } else if (this.tf_lastname.selectedValue == "") {
   msg = "Please enter last name"
  } else if (email == "") {
   msg = "Please enter email"
  } else if (!Util.isEmailValid(email)) {
   msg = "Please enter valid email"
  } else if (mobile == "") {
   msg = "Please enter mobile number"
  } else if (!Util.isMobileValid(mobile)) {
   msg = "Please enter valid mobile number"
  } else if (password == "") {
   msg = "Please enter password"
  } else if (!Util.isPasswordValid(password)) {
   msg = "Password must be 6-12 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
  } else if (confirmPassword == "") {
   msg = "Please enter confirm password"
  } else if (password != confirmPassword) {
   msg = "Password and confirm password should be same"
  }
  if (msg !== "") {
   Util.showToastAlert(ToastAlertType.Danger, "", msg)
   return
  }
  this.createUser()
 }
 createUser() {
  const params = this.getParams()
  Util.loaderSubject.next(true)
  this.apiService.postApi(Constants.USER_URL, params).subscribe({
   next: (res: any) => {
    Util.loaderSubject.next(false)
    if (res["status"]) {
     Util.showToastAlert(ToastAlertType.Success, "", res["msg"])
     this.router.navigate(["layout", "login"])
     this.clearForm()
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
   "fname": this.tf_firstname.selectedValue,
   "lname": this.tf_lastname.selectedValue,
   "email": this.tf_email.selectedValue,
   "mobile": this.tf_mobile.selectedValue,
   "password": this.tf_password.selectedValue,
   "role_id": 2
  }
 }
 clearForm() {
  this.tf_firstname.selectedValue = ""
  this.tf_lastname.selectedValue = ""
  this.tf_email.selectedValue = ""
  this.tf_mobile.selectedValue = ""
  this.tf_password.selectedValue = ""
  this.tf_confirm_password.selectedValue = ""
 }
}
