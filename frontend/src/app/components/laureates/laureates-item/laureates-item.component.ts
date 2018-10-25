import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-laureates-item',
  templateUrl: 'laureates-item.template.html',
  styleUrls: ['laureates-item.styles.scss']
})
export class LaureatesItemComponent implements OnInit {
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
