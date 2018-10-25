import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Album, Source } from '../../../../../components/gallery/declarations';

@Component({
  selector: 'app-album-preview',
  templateUrl: 'album-preview.template.html',
  styleUrls: ['album-preview.styles.scss']
})
export class AlbumPreviewComponent implements OnInit, OnDestroy {
  @Input() public activeAlbumImgSources: EventEmitter<Album>;
  @Output() onChosen: EventEmitter<number> = new EventEmitter();

  public albumName: string;

  public sources: Source[];
  public selectedImg: Source;

  constructor() { }

  ngOnInit() {
    this.activeAlbumImgSources.subscribe(this.onAlbumLoad.bind(this));
  }

  private onAlbumLoad(album): void {
    this.sources = album.sources;
    this.selectedImg = null;
    this.albumName = album.name;
  }

  public suggestToUpdate(item): void {
    this.onChosen.emit(item);
  }

  ngOnDestroy() {
    this.activeAlbumImgSources.unsubscribe();
  }
}
