import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Album, Source } from '../../../../components/gallery/declarations';
import { urls } from '../../../../shared/constants';
import { ServerGetterService } from '../../../../shared/services';

@Component({
  selector: 'app-mock-albums',
  templateUrl: './mock-albums.component.html',
  styleUrls: ['./mock-albums.component.scss']
})
export class MockAlbumsComponent implements OnInit {
  @Output() onChosen: EventEmitter<object> = new EventEmitter();

  public albumImage: any = [];

  constructor(private serverGetterService: ServerGetterService) {
    }

  ngOnInit() {
    this.serverGetterService.get(`${urls.api.prod.modalAlbumImages}`).subscribe(
      res => {
        this.albumImage = res.data;
      }
    );
  }

  public suggestToUpdate(img): void {
    this.serverGetterService.get(`${urls.api.prod.modalAlbumImages}/${img.id}`).subscribe( res => {
      const imgAfterChoose = res.data;
      this.onChosen.emit(imgAfterChoose);
    });

  }

  public cancel(): void {
    this.suggestToUpdate('');
  }
}
