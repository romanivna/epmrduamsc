import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-radio-group-field',
  templateUrl: './radio-group-field.component.html',
  styleUrls: ['./radio-group-field.component.scss']
})
export class RadioGroupFieldComponent implements OnInit {
  @Input() public name: string;
  @Input() public required: any;
  @Input() public radios: any[];
  @Input() public radio: any;
  @Input() public id: number;
  @Input() public form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
