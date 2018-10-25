import { Component, OnInit } from '@angular/core';
import { GaleryNotificationsService } from '../../services/galery-notifications.service';


@Component({
  selector: 'app-footer',
  templateUrl: 'footer.template.html',
  styleUrls: ['footer.styles.scss']
})
export class FooterComponent implements OnInit {

  public isFooterOpen: boolean;
  constructor(public service: GaleryNotificationsService) { }

  ngOnInit() {
    this.isFooterOpen = true;
    this.service.notificationsStream
      .subscribe((data) => {
        this.isFooterOpen = data === 'open';
    });
  }
}
