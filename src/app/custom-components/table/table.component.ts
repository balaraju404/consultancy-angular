import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
 selector: 'lib-table',
 imports: [],
 templateUrl: './table.component.html',
 styleUrl: './table.component.scss'
})
export class TableComponent {
 @Input() tbl_mdl!: TableModal
 @Output() eventHandlerEmiiter = new EventEmitter<void>()

 clickEventEmitter(tag: number, rowData: any) {
  rowData["tag"] = tag
  this.eventHandlerEmiiter.emit(rowData)
 }
}

export enum TableInputTypes {
 Textfield = 1,
 Dropdown = 2,
 Checkbox = 3,
 Radio = 4,
 Toggle = 5,
 DatePicker = 6,
 TextArea = 7,
 FileUpload = 8
}
export enum TableButtonStyle {
 Primary = 'primary',
 Secondary = 'secondary',
 Tertiary = 'tertiary',
 Danger = 'danger',
 Warning = 'warning',
 Success = 'success',
 Info = 'info'
}
export enum TableIcons {
 Add = "fa-solid fa-circle-plus",      // More visually distinctive than plain plus
 Edit = "fa-solid fa-pen-to-square",   // More modern edit icon
 Delete = "fa-solid fa-trash-can",     // Subtle update for trash
 View = "fa-solid fa-eye",             // Keeping this, it's already appropriate
 Download = "fa-solid fa-download",    // Optional: useful for file tables
 Upload = "fa-solid fa-upload",        // Optional: useful for forms
 Info = "fa-solid fa-circle-info",     // Optional: useful for contextual tooltips
 Settings = "fa-solid fa-gear"         // Optional: common for config columns
}

export enum TableHeaderType {
 Text = 1,
 Button = 2,
 Icon = 3,
 Input = 4
}
export class TableHeaders {
 public tag: number = 0
 public headerName: string = ""
 public headerIcon: string = ""
 public headerKey: string = ""
 public isSortable: boolean = false
 public width: number = 100
 public headerAlign: 'left' | 'center' | 'right' = 'left'
 public cellAlign: 'left' | 'center' | 'right' = 'left'
 public emptyMessage: string = "-"
 public isObject: boolean = false
 public objectKey: string = ""
 public customClass: string = ""
 private headerType: TableHeaderType = TableHeaderType.Text

 public isDynamic: boolean = false
 // button
 public buttonText: string = ""
 public btnStyle: TableButtonStyle = TableButtonStyle.Primary

 // icon
 public iconClass: string = ""

 constructor(headerName: string, headerKey: string, tag: number = 0, isSortable: boolean = false) {
  this.tag = tag;
  this.headerName = headerName;
  this.headerKey = headerKey;
  this.isSortable = isSortable;
  this.headerType = TableHeaderType.Text;
 }
 static withButton(headerName: string, btnText: string, tag: number, btnStyle: TableButtonStyle, customClass: string): TableHeaders {
  const header = new TableHeaders(headerName, "", tag);
  header.headerType = TableHeaderType.Button;
  header.buttonText = btnText;
  header.btnStyle = btnStyle;
  header.customClass = customClass;
  return header;
 }
 static withIcon(headerName: string, iconClass: string, tag: number, customClass: string): TableHeaders {
  const header = new TableHeaders(headerName, "", tag);
  header.headerType = TableHeaderType.Icon;
  header.iconClass = iconClass;
  header.customClass = customClass;
  return header;
 }
}
export class TableModal {
 public title: string = ""
 public tblHeaders: TableHeaders[] = []
 public tblData: any = [];
 public isShowSno: boolean = true
 public emptyMessage: string = "No data available"
 constructor(title: string, tblHeaders: TableHeaders[], tblData: any[]) {
  this.title = title;
  this.tblHeaders = tblHeaders;
  this.tblData = tblData;
 }
}