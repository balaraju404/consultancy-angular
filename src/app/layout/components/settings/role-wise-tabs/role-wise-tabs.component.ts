import { Component, inject } from '@angular/core';
import { ApiService, CardModal, TextfieldModel, ButtonModel, BgColor, InputType, ToastAlertType, CardComponent, TextFieldComponent, ButtonComponent, DropdownModal, DropdownComponent } from '@balaraju404/custom-components';
import { TableModal, TableHeaders, TableIcons, TableComponent } from '../../../../custom-components/table/table.component';
import { Constants } from '../../../../utils/constants.service';
import { Util } from '../../../../utils/util.service';
import { CheckboxComponent, CheckboxModal } from '../../../../custom-components/checkbox/checkbox.component';

@Component({
 selector: 'app-role-wise-tabs',
 imports: [CardComponent, DropdownComponent, CheckboxComponent, ButtonComponent, TableComponent],
 templateUrl: './role-wise-tabs.component.html',
 styleUrls: []
})
export class RoleWiseTabsComponent {
 private readonly apiService = inject(ApiService)

 editRecId: string = ""

 card_mdl!: CardModal
 dd_role!: DropdownModal
 cb_mdl!: CheckboxModal
 btn_save!: ButtonModel
 btn_clear!: ButtonModel

 tbl_mdl: TableModal = new TableModal("Role Wise Tabs List", [], [])
 ngOnInit() {
  this.setupFields()
  this.setupTable()
 }
 setupFields() {
  this.card_mdl = new CardModal("Role Wise Tabs", BgColor.Default, true)
  this.card_mdl.customClass = "p-0"

  this.dd_role = new DropdownModal(1, "Roles", true, [], "cat_name", "cat_id")
  this.dd_role.selectedValue = -1

  this.cb_mdl = new CheckboxModal(1, "Category", true, [])
  this.cb_mdl.dataArr = [{ "name": "Masters", "id": 1, "isDisabled": false }, { "name": "Settings", "id": 2 }]
  this.cb_mdl.selectedValue = [1]

  this.btn_save = new ButtonModel(5, "Save")
  this.btn_clear = new ButtonModel(6, "Clear")

  this.getRolesDetails()
 }

 setupTable() {
  const tName = new TableHeaders("Tab Name", "tab_name")
  const tIcon = new TableHeaders("Tab Icon", "tab_icon")
  const tLink = new TableHeaders("Tab Link", "tab_link")
  const cat_name = new TableHeaders("Category Name", "cat_name")
  cat_name.isObject = true
  cat_name.objectKey = "cat_info"
  const edit = TableHeaders.withIcon("Edit", TableIcons.Edit, 5, "")
  const del = TableHeaders.withIcon("Delete", TableIcons.Delete, 6, "")
  const createdDate = new TableHeaders("Created Date", "created_date")
  const modifiedDate = new TableHeaders("Modified Date", "modified_date")
  this.tbl_mdl.tblHeaders = [tName, tIcon, tLink, cat_name, createdDate, modifiedDate, edit, del]
  this.getTabsDetails()
 }

 eventHandler(event: any) {
  console.log(event);

  const tag = event["tag"] || 0
  switch (tag) {
   case 5:
    this.checkValidations()
    break
   case 6:
    this.clearForm()
    break
  }
 }
 tblEventHandler(event: any) {
  const tag = event["tag"] || 0
  switch (tag) {
   case 5:
    this.editRecord(event)
    break
   case 6:
    const status = confirm("Are you sure you want to delete this tab?")
    if (!status) return
    const tab_id = event["tab_id"];
    this.deleteTab(tab_id)
    break
  }
 }
 editRecord(item: any) {
  this.editRecId = item["tab_id"]
  // this.dd_cat.selectedObj = item["cat_info"]
  // this.dd_cat.selectedValue = item["cat_info"]?.["cat_id"] || -1
  // this.tf_tab_name.selectedValue = item["tab_name"] || ""
  // this.tf_tab_icon.selectedValue = item["tab_icon"] || ""
  // this.tf_tab_link.selectedValue = item["tab_link"] || ""
  this.btn_save.btnText = "Update"
 }
 checkValidations() {
  let msg = ""
  // if (this.dd_cat.selectedValue == -1) {
  //  msg = "Please select category"
  // } else if (this.tf_tab_name.selectedValue == "") {
  //  msg = "Please enter tab name"
  // } else if (this.tf_tab_icon.selectedValue == "") {
  //  msg = "Please enter tab icon"
  // } else if (this.tf_tab_link.selectedValue == "") {
  //  msg = "Please enter tab link"
  // }
  if (msg !== "") {
   Util.showToastAlert(ToastAlertType.Danger, "", msg)
   return
  }
  this.createTab()
 }
 getParams() {
  return {
   // "tab_name": this.tf_tab_name.selectedValue,
   // "tab_icon": this.tf_tab_icon.selectedValue,
   // "tab_link": this.tf_tab_link.selectedValue,
   // "cat_id": this.dd_cat.selectedValue
  }
 }
 clearForm() {
  // this.dd_cat.selectedValue = -1
  // this.dd_cat.selectedObj = {}
  // this.tf_tab_name.selectedValue = ""
  // this.tf_tab_icon.selectedValue = ""
  // this.tf_tab_link.selectedValue = ""
  this.editRecId = ""
 }

 // api calls
 getRolesDetails() {
  const params = {}
  Util.loaderSubject.next(true)
  this.apiService.postApi(Constants.CAT_DETAILS_URL, params).subscribe({
   next: (res: any) => {
    Util.loaderSubject.next(false)
    if (res["status"]) {
     this.dd_role.dataArr = res["data"] || []
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
 getTabsDetails() {
  const params = {}
  Util.loaderSubject.next(true)
  this.apiService.postApi(Constants.TABS_DETAILS_URL, params).subscribe({
   next: (res: any) => {
    Util.loaderSubject.next(false)
    if (res["status"]) {
     this.tbl_mdl.tblData = res["data"] || []
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
 createTab() {
  const editStatus = this.editRecId.length > 0
  const params: any = this.getParams()
  if (editStatus) params["tab_id"] = this.editRecId;
  Util.loaderSubject.next(true)
  this.apiService[editStatus ? "putApi" : "postApi"](Constants.TABS_URL, params).subscribe({
   next: (res: any) => {
    Util.loaderSubject.next(false)
    if (res["status"]) {
     Util.showToastAlert(ToastAlertType.Success, "", res["msg"])
     this.getTabsDetails()
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
 deleteTab(tab_id: any) {
  const params = { "tab_id": tab_id }
  Util.loaderSubject.next(true)
  this.apiService.postApi(Constants.TABS_DELETE_URL, params).subscribe({
   next: (res: any) => {
    Util.loaderSubject.next(false)
    if (res["status"]) {
     Util.showToastAlert(ToastAlertType.Success, "", res["msg"])
     this.getTabsDetails()
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
}

