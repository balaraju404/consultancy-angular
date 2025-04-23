import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
 selector: 'lib-checkbox',
 imports: [],
 templateUrl: './checkbox.component.html',
 styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
 @Input() cb_mdl!: CheckboxModal
 @Output() eventHandler = new EventEmitter()

 onCheckChkbox(event: any, idx: number) {
  const checkbox = event.target as HTMLInputElement
  const item = this.cb_mdl.dataArr[idx]
  let valArr = this.cb_mdl.selectedValue as unknown[]
  let objArr = this.cb_mdl.selectedObj as unknown[]

  if (checkbox.checked) {
   valArr.push(item[this.cb_mdl.valueKey])
   objArr.push(item)
  } else {
   valArr = valArr.filter((m: any) => m !== item[this.cb_mdl.valueKey])
   objArr = objArr.filter((m: any) => m[this.cb_mdl.valueKey] !== item[this.cb_mdl.valueKey])
  }

  this.cb_mdl.selectedValue = valArr
  this.cb_mdl.selectedObj = objArr
  this.eventHandler.emit(this.cb_mdl)
 }
 isChecked(val: any): boolean {
  return Array.isArray(this.cb_mdl.selectedValue) && this.cb_mdl.selectedValue.includes(val)
 }
}

export class CheckboxModal {
 public tag: number = 0
 public label: string = ""
 public dataArr: any = []
 public displayKey: string = ""
 public valueKey: string = ""
 public selectedValue: any = []
 public selectedObj: any = []
 public isMandatory: boolean = false
 public isDisabled: boolean = false
 public isValidationFailed: boolean = false
 public customErrMsg: string = ""
 public customClass: string = ""
 public isRowDir: boolean = false
 public gap = '0.75rem'

 constructor(tag: number, label: string, isMandatory: boolean, dataArr: any, dkey: string = "name", dVal: string = "id") {
  this.tag = tag;
  this.label = label;
  this.isMandatory = isMandatory;
  this.dataArr = dataArr;
  this.displayKey = dkey;
  this.valueKey = dVal;
 }
}
