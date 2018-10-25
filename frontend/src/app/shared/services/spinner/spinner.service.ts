import { Injectable, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SpinnerService {

  public spinnerHandler = new Subject<boolean>();
  private showSpinnerEmitCounter = 0;

  public set show(show: boolean) {
    show ? ++this.showSpinnerEmitCounter : --this.showSpinnerEmitCounter;

    if (!show && this.showSpinnerEmitCounter > 0) {
      return;
    }

    this.spinnerHandler.next(show);
  }

  public get onStateChange(): Observable<boolean> {
    return this.spinnerHandler
      .asObservable()
      .distinctUntilChanged();
  }

  public hide() {
    this.show = false;
  }
}
