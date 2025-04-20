import { Component } from '@angular/core';
import { ButtonComponent, ButtonModel, InputType, LSService, TextFieldComponent, TextfieldModel } from '@balaraju404/custom-components';
import { Constants } from '../../../utils/constants.service';

@Component({
 selector: 'app-profile',
 imports: [TextFieldComponent, ButtonComponent],
 templateUrl: './profile.component.html',
 styleUrls: []
})
export class ProfileComponent {
 userData: any = {}
 showFields: any = [
  { "key": "fname", "name": "First Name" },
  { "key": "lname", "name": "Last Name" },
  { "key": "email", "name": "Email" },
  { "key": "mobile", "name": "Mobile" }
 ]

 tf_fname!: TextfieldModel
 tf_lname!: TextfieldModel;
 tf_email!: TextfieldModel;
 tf_mobile!: TextfieldModel;
 btn_edit!: ButtonModel
 btn_logout!: ButtonModel
 btn_change_pwd!: ButtonModel

 ngOnInit() {
  this.userData = LSService.getItem(Constants.LS_USERDATA_KEY)
  this.setupFeilds();
 }
 setupFeilds() {
  this.tf_fname = new TextfieldModel(1, "First Name", "", InputType.Text, true)
  this.tf_lname = new TextfieldModel(2, "Lst Name", "", InputType.Text, true)
  this.tf_email = new TextfieldModel(3, "Email", "", InputType.Email, true)
  this.tf_mobile = new TextfieldModel(4, "Mobile", "", InputType.Text, true)

  this.btn_edit = new ButtonModel(5, "Edit")
  this.btn_edit.customClass = "btn-info"
  this.btn_change_pwd = new ButtonModel(6, "Change Password")
  this.btn_logout = new ButtonModel(7, "Logout")
  this.btn_logout.customClass = "btn-danger"
  if (Object.keys(this.userData).length > 0) this.updateFieldsData();
 }
 updateFieldsData() {
  this.tf_fname.selectedValue = this.userData["fname"] || ""
  this.tf_lname.selectedValue = this.userData["lname"] || ""
  this.tf_email.selectedValue = this.userData["email"] || "";
  this.tf_mobile.selectedValue = this.userData["mobile"] || "";

 }
}
