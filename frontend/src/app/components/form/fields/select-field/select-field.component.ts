import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent implements AfterViewInit {
  @Input() public id: number;
  @Input() public field: any;
  @Input() public form: FormGroup;

  @ViewChild('select')
  private select: ElementRef;

  constructor() {
  }

  ngAfterViewInit() {
    if (this.field.shouldFocus) {
      this.select.nativeElement.focus();
    }
  }
}
