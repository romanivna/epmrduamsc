import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { channelPlaylistId, googleApiKey } from 'app/shared/constants';
import { VideoDetails } from './declarations';

@Component({
  selector: 'app-video-page',
  templateUrl: 'videos.template.html',
  styleUrls: ['videos.styles.scss']
})
export class VideosComponent implements OnInit {
  public videoList: VideoDetails[] = [];
  private currentVideo;
  public showModal = false;

  private endpoints = {
    youtubePlayer: 'https://www.youtube.com/embed/',
    youtubePlaylistItems: 'https://www.googleapis.com/youtube/v3/playlistItems'
  };

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { };

  selectVideo(video) {
    this.currentVideo = this.sanitizer.bypassSecurityTrustResourceUrl( this.endpoints.youtubePlayer + video.resourceId.videoId );
    this.showModal = !(this.currentVideo === undefined);
  }
  convertDateString(dateString) {
    return dateString
      .match(/[0-9]{0,}-[0-9]{0,}-[0-9]{0,}/)[0]
      .replace(/-/g, '.');
  }
  getVideos(): void {
    this.http.get
    (`${this.endpoints.youtubePlaylistItems}?part=snippet&key=${googleApiKey}&playlistId=${channelPlaylistId}&maxResults=13`)
      .subscribe(data => {
        data['items'].forEach((item, i) => {
          if (item.snippet.thumbnails === undefined) {
            data['items'].splice(i, 1);
          }
        });
        this.videoList = data['items'].map( v => v.snippet );
      });
  }
  ngOnInit() {
    this.getVideos();
  }
}
