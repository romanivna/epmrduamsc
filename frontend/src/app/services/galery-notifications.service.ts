import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GaleryNotificationsService {

  private notifications: Subject<string> = new Subject<string>();

  constructor() {
  }

  galleryClose() {
    this.notifications.next('open');
  }


  galleryOpen() {
    this.notifications.next('close');
  }

  get notificationsStream() {
    return this.notifications.asObservable();
  }
}
