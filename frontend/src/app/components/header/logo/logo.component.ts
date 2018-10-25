import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: 'logo.template.html',
  styleUrls: ['logo.styles.scss']
})
export class LogoComponent implements OnInit {
  @Input()
  public src: string;

  constructor() { }

  ngOnInit() {
  }

}
