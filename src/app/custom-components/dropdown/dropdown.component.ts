import { Component, EventEmitter, inject, Input, KeyValueDiffers, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OutsideClickService } from '../../utils/outside-click.service';
@Component({
 selector: 'lib-dropdown',
 standalone: true,
 imports: [CommonModule, FormsModule],
 templateUrl: './dropdown.component.html',
 styleUrls: ['dropdown.component.scss']
})
export class DropdownComponent {
 @Input('dd_model') dd_model!: UIDropdown
 @Output() eventHandlerEmitter = new EventEmitter();
 isDropdownOpen = false;
 selectedItem: any = null;
 private readonly closeOutsideClick = inject(OutsideClickService);
 private readonly differs = inject(KeyValueDiffers);
 differ: any;
 ngOnInit() {
  this.differ = this.differs.find(this.dd_model).create();
  this.outsideclick();
 }
 ngDoCheck() {
  const changes = this.differ.diff(this.dd_model);
  const previousValue = changes?.["_records"]?.get("selectedValue")?.["previousValue"] || -1;
  const currentValue = changes?.["_records"]?.get("selectedValue")?.["currentValue"] || -1;
  if (changes && previousValue != currentValue) {
   const selectedValue = this.dd_model['selectedValue'];
   const selectedObj = this.dd_model.dataArr.filter((m: any) => m[this.dd_model.valueKey] == selectedValue)[0] || {}
   this.dd_model.selectedObj = selectedObj;
  }
 }
 outsideclick() {
  this.closeOutsideClick.clickOutsideEmitter.subscribe(() => {
   this.isDropdownOpen = false;
  });
 }
 toggleDropdown() {
  if (this.dd_model!.isDisabled) return;
  this.isDropdownOpen = !this.isDropdownOpen;
 }
 selectItem(item: any) {
  this.selectedItem = (item == -1) ? {} : item;
  this.dd_model!['selectedValue'] = (item == -1) ? -1 : this.selectedItem[this.dd_model!["valueKey"]]
  this.dd_model!['selectedObj'] = this.selectedItem
  this.isDropdownOpen = false;
  this.eventHandlerEmitter.emit(this.dd_model)
 }
 onChangeEvent(event: any) {
  this.dd_model!['selectedValue'] = isNaN(event.target.value) ? (event.target.value) : Number(event.target.value)
  const filter_data = this.dd_model!['dataArr'].filter((f: any) => f[this.dd_model!['valueKey']] == this.dd_model!['selectedValue'])
  if (filter_data.length > 0) {
   this.dd_model!['selectedObj'] = JSON.parse(JSON.stringify(filter_data[0]))
  } else {
   this.dd_model!['selectedObj'] = {}
  }
  this.eventHandlerEmitter.emit(this.dd_model)
 }
}
export enum DropdownStyle {
 Default = '',
 Primary = 'primary',
}
export class UIDropdown {
 public dropDownTag: number = 0
 public isMandatory: boolean = false
 public labelText: string = ""
 public isValidationFailed: boolean = false
 public customCssClass: string = ""
 public style: DropdownStyle = DropdownStyle.Default
 public customErrMsg: string = ""
 public selectedValue: any = 0
 public selectedObj: any = {}
 public formPostKey: any = ""
 public isDynamic: boolean = false
 public isDisabled: boolean = false
 public inputEventListner: any = null
 public displayKey: string = ""
 public valueKey: string = ""
 public dataArr: any = []
 public placeholderText: string = ""
 public maxSelectableOptions: any;
 public minSelectableOptions: any;
 public isRowDir: boolean = false
 public customRowClassPrimary = 'col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'
 public customRowClassSecondary = 'col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8'
 public imgSrc: string = ""
 public imgCustomClass: string = ""
 public static fromDefaultOpts(labelText: string, tag: number, isMandatory: boolean, isDynamic: boolean) {
  return new UIDropdown(labelText, tag, isMandatory, isDynamic);
 }
 public static fromDynamicOpts(labelText: string, tag: number, isMandatory: boolean, dkey: string, dVal: string) {
  return new UIDropdown(labelText, tag, isMandatory, true, [], dkey, dVal);
 }
 public static fromStaticOpts(labelText: string, tag: number, isMandatory: boolean, dataArr: any, dkey?: string, dVal?: string) {
  return new UIDropdown(labelText, tag, isMandatory, false, dataArr, dkey, dVal);
 }

 constructor(labelText: string, tag: number, isMandatory: boolean, isDynamic?: boolean, dataArr?: any, dkey?: string, dVal?: string) {
  this.dropDownTag = tag
  this.isMandatory = isMandatory;
  this.labelText = labelText
  if (isDynamic != null)
   this.isDynamic = isDynamic
  if (dataArr != null)
   this.dataArr = dataArr
  if (dkey != null)
   this.displayKey = dkey
  if (dVal != null)
   this.valueKey = dVal
 }
}

