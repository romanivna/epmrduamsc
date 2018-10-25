import { Component, Input, OnInit, EventEmitter } from '@angular/core';

import { Album, Source } from '../declarations';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit {

  @Input() public activeAlbumImgSources: EventEmitter<Album>;

  public albumName: string;
  public showAlbumName = false;

  public sources: Source[];
  public selectedImg: Source;

  public onSelectImg(img: Source): void {
    this.selectedImg = img;
  }

  ngOnInit() {
    this.activeAlbumImgSources.subscribe(this.onAlbumLoad);
  }

  private onAlbumLoad = (album) => {
    this.sources = album.sources;
    this.selectedImg = album.sources[2] || album.sources[0];
    this.albumName = album.name;
  }

}
