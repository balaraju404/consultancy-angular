import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent, ButtonModel, InputType, TextFieldComponent, TextfieldModel } from '@balaraju404/custom-components';
import { fade } from '../../../utils/animate';
@Component({
  selector: 'app-signup',
  imports: [TextFieldComponent, ButtonComponent],
  templateUrl: './signup.component.html',
  styleUrls: [],
   animations: [fade]
})
export class SignupComponent implements OnInit{
 private readonly router = inject(Router);
 tf_firstname!: TextfieldModel;
 tf_lastname!: TextfieldModel;
 tf_mail!: TextfieldModel;
 tf_password!: TextfieldModel;
 tf_confirm_password!: TextfieldModel;
 btn_registor!: ButtonModel;
 ngOnInit(){
  this.setUpFields();
 }
 setUpFields(){
  this.tf_firstname = new TextfieldModel(1,'First Name','',InputType.Text);
  this.tf_lastname = new TextfieldModel(2,"Last Name","",InputType.Text);
  this.tf_mail= new TextfieldModel(3,"Mail","",InputType.Email);
  this.tf_password = new TextfieldModel(4,'New Password','',InputType.Password);
  this.tf_confirm_password = new TextfieldModel(5,'Confirm Password','',InputType.Password);
  this.btn_registor = new ButtonModel(6, "Register");
  this.btn_registor.customClass = "btn-dark text-bold";
 }
 toLogin(){
  this.router.navigate(["layout", "login"]);
 }
}
