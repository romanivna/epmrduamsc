import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alumni-item',
  templateUrl: './alumni-item.component.html',
  styleUrls: ['./alumni-item.component.scss']
})
export class AlumniItemComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  source: string;
  @Input()
  text: string;
  constructor() { }

  ngOnInit() {
  }

}
