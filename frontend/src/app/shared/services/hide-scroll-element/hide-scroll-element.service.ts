import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class HideScrollElementService {

  private notifications: Subject<string> = new Subject<string>();

  constructor() {
  }

  hideElement() {
    this.notifications.next('hide');
  }


  showElement() {
    this.notifications.next('show');
  }

  get notificationsStream() {
    return this.notifications.asObservable();
  }
}
