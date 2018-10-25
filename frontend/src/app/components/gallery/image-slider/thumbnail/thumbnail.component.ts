import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Source } from '../../declarations';

@Component({
  selector: 'app-thumbnail',
  templateUrl: 'thumbnail.component.html',
  styleUrls: ['thumbnail.component.scss']
})
export class ThumbnailComponent implements OnChanges {

  @Input() public activeAlbumImgSources: Source[];
  @Output() public selectImg: EventEmitter<Source> = new EventEmitter();

  public activeThumbnail: Source;

  private readonly showThumbnailsCount = 5;
  private showThumbnailsFromIndex = 0;

  ngOnChanges() {
    this.showThumbnailsFromIndex = 0;
    this.activeThumbnail = this.activeAlbumImgSources[2];
  }

  public get thumbnails(): Source[] {
    return this.activeAlbumImgSources.slice(
      this.showThumbnailsFromIndex, this.showThumbnailsFromIndex + this.showThumbnailsCount
    );
  }

  public onNextThumbnails(): void {
    if (this.isNoMoreNextThumbnails()) {
      this.showThumbnailsFromIndex += this.showThumbnailsCount;
      return;
    }
    this.showThumbnailsFromIndex = 0;
  }

  public onPrevThumbnails(): void {
    if (this.isNoMorePrevThumbnails()) {
      this.showThumbnailsFromIndex -= this.showThumbnailsCount;
      return;
    }
    const showLast = this.activeAlbumImgSources.length % this.showThumbnailsCount;
    this.showThumbnailsFromIndex = this.activeAlbumImgSources.length - showLast;
  }

  public isNoMoreNextThumbnails(): boolean {
    return this.showThumbnailsFromIndex + this.showThumbnailsCount < this.activeAlbumImgSources.length;
  }

  public isNoMorePrevThumbnails(): boolean {
    return this.showThumbnailsFromIndex - this.showThumbnailsCount >= 0;
  }

  public onSelectImg(img: Source): void {
    this.activeThumbnail = img;
    this.selectImg.emit(img);
  }

}
