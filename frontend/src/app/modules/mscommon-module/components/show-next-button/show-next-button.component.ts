import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-show-next-button',
  templateUrl: 'show-next-button.component.html',
  styleUrls: ['show-next-button.component.scss']
})
export class ShowNextButtonComponent {

  @Input() public hideButton: boolean;

  @Output() public showNext: EventEmitter<Event> = new EventEmitter();

  constructor() { }

  public onClick(event) {
    this.showNext.emit(event);
  }

}
