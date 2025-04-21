import { Component, inject } from '@angular/core';
import { ApiService, ButtonComponent, ButtonModel, DropdownComponent, TextFieldComponent, TextfieldModel, DropdownModal, InputType } from '@balaraju404/custom-components';

@Component({
 selector: 'app-tabs',
 imports: [DropdownComponent, TextFieldComponent, ButtonComponent],
 templateUrl: './tabs.component.html',
 styleUrls: []
})
export class TabsComponent {
 private readonly apiService = inject(ApiService)
 categories: any = [
  { "cat_id": 1, "cat_name": "Masters", "link": "masters" },
  { "cat_id": 2, "cat_name": "Settings", "link": "settings" },
 ]
 dd_cat!: DropdownModal
 tf_tab_name!: TextfieldModel
 tf_tab_icon!: TextfieldModel
 tf_tab_link!: TextfieldModel
 btn_save!: ButtonModel
 btn_clear!: ButtonModel
 ngOnInit() {
  this.setupFields()
 }
 setupFields() {
  this.dd_cat = new DropdownModal(1, "Categories", true, this.categories, "cat_name", "cat_id")
  this.dd_cat.selectedValue = -1
  console.log(this.dd_cat);
  

  this.tf_tab_name = new TextfieldModel(2, "Tab Name", "Enter tab name", InputType.Text, true)
  this.tf_tab_icon = new TextfieldModel(3, "Tab Icon", "Enter tab icon {font awesome}", InputType.Text, true)
  this.tf_tab_link = new TextfieldModel(4, "Tab Link", "Enter tab link", InputType.Text, true)

  this.btn_save = new ButtonModel(5, "Save")
  this.btn_clear = new ButtonModel(6, "Clear")
 }
}
