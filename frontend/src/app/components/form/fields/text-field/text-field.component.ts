import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements OnInit {
  @Input() public id: number;
  @Input() public field: any;
  @Input() public form: FormGroup;
  @Input() public i: number;

  constructor() {
  }

  ngOnInit() {
  }

  setDefaultValueIfEmpty(objInput: any) {
    if (!objInput.value && this.field.valueDefault) {
      objInput.value = this.field.valueDefault;
    }
  }
}
