import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-box',
  templateUrl: './date-box.component.html',
  styleUrls: ['./date-box.component.scss']
})
export class DateBoxComponent implements OnInit {

  @Input() public date: any;

  constructor() { }

  ngOnInit() {
  }

}
