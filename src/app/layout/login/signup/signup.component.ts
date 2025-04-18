import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent, ButtonModel, InputType, TextFieldComponent, TextfieldModel } from '@balaraju404/custom-components';
import { fade } from '../../../utils/animate';
import { Util } from '../../../utils/util.service';
import { ToastAlertType } from '../../../custom-components/alert-toast/alert-toast.component';
@Component({
 selector: 'app-signup',
 imports: [TextFieldComponent, ButtonComponent],
 templateUrl: './signup.component.html',
 styleUrls: [],
 animations: [fade]
})
export class SignupComponent implements OnInit {
 private readonly router = inject(Router);
 tf_firstname!: TextfieldModel;
 tf_lastname!: TextfieldModel;
 tf_mail!: TextfieldModel;
 tf_password!: TextfieldModel;
 tf_confirm_password!: TextfieldModel;
 btn_registor!: ButtonModel;
 ngOnInit() {
  this.setUpFields();
 }
 setUpFields() {
  this.tf_firstname = new TextfieldModel(1, "First Name", "Enter first name", InputType.Text);
  this.tf_lastname = new TextfieldModel(2, "Last Name", "Enter last name", InputType.Text);
  this.tf_mail = new TextfieldModel(3, "Email", "Enter email", InputType.Email);
  this.tf_password = new TextfieldModel(4, "New Password", "Enter password", InputType.Password);
  this.tf_confirm_password = new TextfieldModel(5, "Confirm Password", "Enter Confirm password", InputType.Password);
  this.btn_registor = new ButtonModel(6, "Register");
  this.btn_registor.customClass = "btn-dark text-bold";
 }
 toLogin() {
  this.router.navigate(["layout", "login"]);
 }
 eventHandler(event: any) {
  console.log(event);
  const tag = event["tag"] || 0
  switch (tag) {
   case 6:
    this.checkValidations()
    break;
  }
 }
 checkValidations() {
  const msg = "Please enter all fields"
  Util.showToastAlert(ToastAlertType.Danger, "", msg)
 }
}
