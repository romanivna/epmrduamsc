import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: 'title.template.html',
  styleUrls: ['title.styles.scss']
})
export class TitleComponent implements OnInit {
  @Input()
  public title: string;
  @Input()
  public linkFor: any;
  @Input()
  public isLine = false;
  @Input()
  public question: string;
  @Input()
  public buttonText: any;

  @Output()
  public eventEmitter = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  onTitleClick(event) {
    this.eventEmitter.emit(event);
  }

}
