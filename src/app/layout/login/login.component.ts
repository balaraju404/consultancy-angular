import { Component, inject } from '@angular/core';
import { ButtonComponent, ButtonModel, InputType, TextFieldComponent, TextfieldModel } from '@balaraju404/custom-components';
import { Router } from '@angular/router';
import { fade } from '../../utils/animate';
@Component({
 selector: 'app-login',
 imports: [TextFieldComponent, ButtonComponent],
 templateUrl: './login.component.html',
 styleUrls: [],
 animations: [fade]
})
export class LoginComponent {
 private readonly router = inject(Router);
 tf_mdl_username!: TextfieldModel
 tf_mdl_pwd!: TextfieldModel
 btn_mdl_login!: ButtonModel
 btn_mdl_login_otp!: ButtonModel
 ngOnInit() {
  this.setupFields()
 }
 setupFields() {
  this.tf_mdl_username = new TextfieldModel(1, "User Name", "Enter your username")
  this.tf_mdl_pwd = new TextfieldModel(2, "Password", "Enter your password", InputType.Password)
  this.btn_mdl_login = new ButtonModel(3, "Login")
  this.btn_mdl_login.customClass = "btn-dark text-bold"
  this.btn_mdl_login_otp = new ButtonModel(4, "Login with OTP")
  this.btn_mdl_login_otp.customClass = "btn-muted text-bold"
 }
 toRegistor(){
  this.router.navigate(["layout", "sign-up"]);
 }
}
