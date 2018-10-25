import { Component, OnInit  } from '@angular/core';
import { DetectBrowserService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: 'app.template.html',
  styleUrls: ['app.styles.scss']
})
export class AppComponent implements OnInit {
  public showWarningButton: Boolean = false;
  public warningText: any;

  constructor(private detectBrowserService: DetectBrowserService) { }

  ngOnInit() {
    if (this.detectBrowserService.isIE11()) {
      this.warningText = {
        text: 'warningWindowEdge'
      };
    }
  }

  public decideAboutVoting(answer: boolean): void {
    this.warningText = null;
  }

}
