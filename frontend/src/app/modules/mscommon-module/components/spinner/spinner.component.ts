import { Component, OnInit, OnDestroy } from '@angular/core';

import { SpinnerService } from '../../../../shared/services/spinner';

@Component({
  selector: 'app-spinner',
  templateUrl: 'spinner.template.html'
})
export class SpinnerComponent implements OnInit, OnDestroy {

  public showSpinner;
  public subs;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.subs = this.spinnerService.onStateChange.subscribe(data => {
      this.showSpinner = data;
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    // this.spinnerService.onStateChange.unsubscribe();
  }

}
