import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-group-field',
  templateUrl: './text-group-field.component.html',
  styleUrls: ['./text-group-field.component.scss']
})
export class TextGroupFieldComponent implements OnInit {
  @Input() public name: string;
  @Input() public fields: any[];
  @Input() public form: FormGroup;
  @Input() public id: number;
  constructor() { }

  ngOnInit() {
  }

}
