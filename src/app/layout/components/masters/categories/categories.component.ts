import { Component, inject } from '@angular/core';
import { ApiService, CardModal, DropdownModal, TextfieldModel, ButtonModel, BgColor, InputType, ToastAlertType, CardComponent, TextFieldComponent, ButtonComponent } from '@balaraju404/custom-components';
import { TableModal, TableHeaders, TableIcons, TableComponent } from '../../../../custom-components/table/table.component';
import { Constants } from '../../../../utils/constants.service';
import { Util } from '../../../../utils/util.service';

@Component({
 selector: 'app-categories',
 imports: [CardComponent, TextFieldComponent, ButtonComponent, TableComponent],
 templateUrl: './categories.component.html',
 styleUrls: []
})
export class CategoriesComponent {
 private readonly apiService = inject(ApiService)
 editRecId: string = ""

 card_mdl!: CardModal
 tf_cat_name!: TextfieldModel
 tf_cat_icon!: TextfieldModel
 tf_cat_link!: TextfieldModel
 btn_save!: ButtonModel
 btn_clear!: ButtonModel

 tbl_mdl: TableModal = new TableModal("Category List", [], [])
 ngOnInit() {
  this.setupFields()
  this.setupTable()
 }
 setupFields() {
  this.card_mdl = new CardModal("Create Category", BgColor.Default, true)
  this.card_mdl.customClass = "p-0"

  this.tf_cat_name = new TextfieldModel(1, "Category Name", "Enter category name", InputType.Text, true)
  this.tf_cat_icon = new TextfieldModel(2, "Category Icon", "Enter category icon {font awesome}", InputType.Text, true)
  this.tf_cat_link = new TextfieldModel(3, "Category Link", "Enter category link", InputType.Text, true)

  this.btn_save = new ButtonModel(4, "Save")
  this.btn_clear = new ButtonModel(5, "Clear")
 }

 setupTable() {
  const catName = new TableHeaders("Category Name", "cat_name")
  const catIcon = new TableHeaders("Category Icon", "cat_icon")
  const catLink = new TableHeaders("Category Link", "cat_link")
  const edit = TableHeaders.withIcon("Edit", TableIcons.Edit, 4, "")
  const del = TableHeaders.withIcon("Delete", TableIcons.Delete, 5, "")
  const createdDate = new TableHeaders("Created Date", "created_date")
  const modifiedDate = new TableHeaders("Modified Date", "modified_date")
  this.tbl_mdl.tblHeaders = [catName, catIcon, catLink, createdDate, modifiedDate, edit, del]
  this.getCategoryDetails()
 }

 eventHandler(event: any) {
  const tag = event["tag"] || 0
  switch (tag) {
   case 4:
    this.checkValidations()
    break
   case 5:
    this.clearForm()
    break
  }
 }
 tblEventHandler(event: any) {
  const tag = event["tag"] || 0
  switch (tag) {
   case 4:
    this.editRecord(event)
    break
   case 5:
    const status = confirm("Are you sure you want to delete this category?")
    if (!status) return
    const cat_id = event["cat_id"];
    this.deleteTab(cat_id)
    break
  }
 }
 editRecord(item: any) {
  this.editRecId = item["cat_id"]
  this.tf_cat_name.selectedValue = item["cat_name"] || ""
  this.tf_cat_icon.selectedValue = item["cat_icon"] || ""
  this.tf_cat_link.selectedValue = item["cat_link"] || ""
  this.btn_save.btnText = "Update"
 }
 checkValidations() {
  let msg = ""
  if (this.tf_cat_name.selectedValue == "") {
   msg = "Please enter category name"
  } else if (this.tf_cat_icon.selectedValue == "") {
   msg = "Please enter category icon"
  } else if (this.tf_cat_link.selectedValue == "") {
   msg = "Please enter category link"
  }
  if (msg !== "") {
   Util.showToastAlert(ToastAlertType.Danger, "", msg)
   return
  }
  this.createCategory()
 }
 getParams() {
  return {
   "cat_name": this.tf_cat_name.selectedValue,
   "cat_icon": this.tf_cat_icon.selectedValue,
   "cat_link": this.tf_cat_link.selectedValue,
  }
 }
 clearForm() {
  this.tf_cat_name.selectedValue = ""
  this.tf_cat_icon.selectedValue = ""
  this.tf_cat_link.selectedValue = ""
  this.editRecId = ""
 }

 // api calls
 getCategoryDetails() {
  const params = {}
  Util.loaderSubject.next(true)
  this.apiService.postApi(Constants.CAT_DETAILS_URL, params).subscribe({
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
 createCategory() {
  const editStatus = this.editRecId.length > 0
  const params: any = this.getParams()
  if (editStatus) params["cat_id"] = this.editRecId;
  Util.loaderSubject.next(true)
  this.apiService[editStatus ? "putApi" : "postApi"](Constants.CAT_URL, params).subscribe({
   next: (res: any) => {
    Util.loaderSubject.next(false)
    if (res["status"]) {
     Util.showToastAlert(ToastAlertType.Success, "", res["msg"])
     this.getCategoryDetails()
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
 deleteTab(cat_id: any) {
  const params = { "cat_id": cat_id }
  Util.loaderSubject.next(true)
  this.apiService.postApi(Constants.CAT_DELETE_URL, params).subscribe({
   next: (res: any) => {
    Util.loaderSubject.next(false)
    if (res["status"]) {
     Util.showToastAlert(ToastAlertType.Success, "", res["msg"])
     this.getCategoryDetails()
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

