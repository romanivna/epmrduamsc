import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { GaleryNotificationsService } from '../../../../services/galery-notifications.service';
import { urls } from '../../../../shared/constants';

@Component({
  selector: 'app-albums-modal-window',
  templateUrl: 'albums-modal-window.template.html',
  styleUrls: ['albums-modal-window.styles.scss']
})

export class AlbumsModalWindowComponent implements OnInit, OnDestroy {
  @Output() onAlbumChosen: EventEmitter<any> = new EventEmitter();

  constructor(private notificationService: GaleryNotificationsService) {
  }

  ngOnInit() {
    this.notificationService.galleryOpen();
  }

  public suggestToUpdate(imageItem): void {
    this.onAlbumChosen.emit(imageItem);
    this.notificationService.galleryClose();
  }

  public cancel(): void {
    this.suggestToUpdate(-1);
  }

  public ngOnDestroy() {
    this.notificationService.galleryClose();
  }

}
