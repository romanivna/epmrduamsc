import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-confirmation-modal-window',
  templateUrl: 'confirmation-modal-window.template.html',
  styleUrls: ['confirmation-modal-window.styles.scss']
})
export class ConfirmationModalWindowComponent implements OnInit {
  @Input()
  public question: any;
  @Input()
  public showButton: Boolean = true;

  @Output()
  public onVoted = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  public onAgree() {
    this.onVoted.emit(true);
  }

  public onDisagree() {
    this.onVoted.emit(false);
  }

}
