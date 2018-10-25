import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Headers } from '@angular/http';

import { ServerGetterService } from '../../../../shared/services';
import { Album, Source } from '../../../../components/gallery/declarations';
import { urls, configurations } from '../../../../shared/constants';
import { WindowRefService } from './../../../../shared/services/';

@Component({
  selector: 'app-albums',
  templateUrl: 'albums.template.html',
  styleUrls: ['albums.styles.scss']
})
export class AlbumsComponent implements OnInit {
  @Output() activeAlbum: EventEmitter<Album> = new EventEmitter();
  @Input() public modalWindow = false;
  @Input() public extended = true;
  // public albums: Album[] = [];
  public albums = [];
  public allAlbumsLoaded = false;
  public activeAlbumId = 0;
  private showAlbumsFrom = 0;
  private readonly albumsUrl = urls.api.prod.albums;
  private _window: Window;
  private removingId: any;
  private questionForConfirmation: any;
  private noAlbums = false;

  constructor(private serverGetterService: ServerGetterService,
              private windowRef: WindowRefService) {
    this._window = windowRef.nativeWindow;
   }

  ngOnInit() {
    this.getAlbums();
  }

  public onClick(album: Album): void {
    if (this.activeAlbumId === album.id) {
      return;
    }
    this.activeAlbum.emit(album);
    this.activeAlbumId = album.id;
    this._window.scroll(0, 0);
  }

  private getAlbums(): void {
    const URLSearchParams = {
      '_start': this.showAlbumsFrom,
      '_limit': configurations.albumsPreview.loadAlbumsItemsPerFirstRequest
    };

    if (this.albums.length !== 0) {
      URLSearchParams._limit = configurations.albumsPreview.loadAlbumsItemsPerRequest;
      this.showAlbumsFrom += configurations.albumsPreview.loadAlbumsItemsPerRequest;
    } else {
      this.showAlbumsFrom = configurations.albumsPreview.loadAlbumsItemsPerFirstRequest;
    }

    this.serverGetterService.get<Album[]>(this.albumsUrl, URLSearchParams)
      .takeWhile(() => this.albums !== null)
      .subscribe(albums => {
        this.albums = this.albums.concat(albums.data);
        this.areAllAlbumsLoaded(albums['total-count']);
        this.activeAlbum.emit(this.albums[0]);
        if (this.albums.length === 0) {
          this.noAlbums = true;
        }
      }, error => {
        console.log(error);
      });
  }

  public areAllAlbumsLoaded(count: number) {
    if (count === this.albums.length) {
      this.allAlbumsLoaded = true;
    }
  }

  public onNextAlbumsItemsClick() {
    this.getAlbums();
  }

  public remove(_id) {
    this.removingId = _id;
    const currentAlbum = this.albums.filter(item => {
      return item.id === this.removingId;
    });
    this.questionForConfirmation = {
      text: 'confirmationQuestion',
      itemHeader: ` '${ currentAlbum[0].name }' `,
      itemName: 'confirmationQuestionAlbum'
    };
  }

  private decideAboutVoting(answer) {
    this.questionForConfirmation = null;
    if (answer) {
      this.serverGetterService.delete(`${urls.api.prod.albums}/${this.removingId}`, true).subscribe(data => {
        this.albums = [];
        this.showAlbumsFrom = 0;
        this.getAlbums();
      });
    }
  }

}
