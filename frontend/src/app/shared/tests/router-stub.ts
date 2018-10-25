import {Directive, Input, HostListener} from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Directive({
  selector: '[routerLink]'
})
export class RouterLinkStubDirective {
  @Input() routerLink: string;
  navigatedTo = '';

  @HostListener('(click)') onClick() {
    this.navigatedTo = this.routerLink;
  }
}

export class RouterStub {
  public events = new Observable((obs) => {
    obs.next(new NavigationEnd(0, './', './'));
    obs.next(new NavigationEnd(0, './', './'));
  });
  navigate(): void {}
}
