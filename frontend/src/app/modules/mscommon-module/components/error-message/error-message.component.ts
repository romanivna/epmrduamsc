import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: 'error-message.template.html',
  styleUrls: ['error-message.styles.scss']
})
export class ErrorMessageComponent implements OnInit {
  @Input() public message: string;
  @Input() public timeout: number;
  @Output() private onEnding: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.setTimeoutToHide();
  }

  private setTimeoutToHide(): void {
    setTimeout(() => {
      this.onEnding.emit(true);
    }, this.timeout || 5000);
  }

}
