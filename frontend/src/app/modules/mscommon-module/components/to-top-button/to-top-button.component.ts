import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-to-top-button',
  templateUrl: './to-top-button.component.html',
  styleUrls: ['./to-top-button.component.scss']
})
export class ToTopButtonComponent implements OnInit {
  static readonly HEIGHT_AFTER_WHICH_SHOW_BUTTON = 500;
  showButton: boolean;

  ngOnInit() {

  }

  @HostListener('window:scroll', ['$event']) onWindowScroll($event) {
      if (document.body.scrollTop > ToTopButtonComponent.HEIGHT_AFTER_WHICH_SHOW_BUTTON ||
          document.documentElement.scrollTop > ToTopButtonComponent.HEIGHT_AFTER_WHICH_SHOW_BUTTON) {
      this.showButton = true;
    } else {
      this.showButton = false;
    }
  }

  toTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

}
