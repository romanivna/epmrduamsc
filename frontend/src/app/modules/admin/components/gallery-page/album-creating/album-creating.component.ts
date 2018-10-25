import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerGetterService } from '../../../../../shared/services/server-getter/server-getter.service';
import { urls } from '../../../../../shared/constants/index';
import { Album } from '../../../../../components/gallery/declarations/index';
import { DragAndDropService } from '../../../../../shared/services/drag-and-drop/drag-and-drop.service';
import { SpinnerService } from '../../../../../shared/services/spinner/spinner.service';

@Component({
  selector: 'app-album-creating',
  templateUrl: 'album-creating.component.html',
  styleUrls: ['album-creating.component.scss']
})
export class AlbumCreatingComponent implements OnInit, OnDestroy {
  public album: any;
  public questionForConfirmation: any;
  public savePressed = false;
  public errName = false;
  public errImg = false;
  private subscriptions = [];
  private isUpdate: boolean;
  private albumName: string;
  private downloadFinished = true;

  constructor(private activatedRoute: ActivatedRoute,
              private serverGetter: ServerGetterService,
              private DnD: DragAndDropService,
              private router: Router,
              private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.subscriptions.push(this.activatedRoute.params.subscribe(params => {
      this.isUpdate = Boolean(+params['id']);
    }));
    this.activatedRoute.params.subscribe(data => {
       if (data['id'] !== undefined) {
         this.isUpdate = true;
       }
      });
    this.getAlbums();
  }

  private getAlbums() {
    if (this.isUpdate) {
      this.activatedRoute.params
        .switchMap(({ id }) => this.serverGetter.get(`${urls.api.prod.albums}/${id}`))
        .subscribe(
          ({ data }) => {
            this.album = <Album>data;
            this.albumName = this.album.name;
          },
        );
    } else {
      this.album = {
        id: '',
        name: '',
        sources: [],
      };
      this.albumName = this.album.name;
    }
  }

  public addImage(event: any): void {
    this.downloadFinished = false;
    let counter = 0;
    const files = Array.from(event.target.files);
    this.spinnerService.spinnerHandler.next(true);
    files.forEach( (item, i) => {
      this.DnD.addOnlyFile(item, this.album.sources, false, event.target.value, event.target, true, undefined, () => {
        counter++;
        if (counter === files.length ) {
          this.downloadFinished = true;
          this.spinnerService.hide();
        }
      });
    });

  }

  private suggestToSave() {
    if (this.albumName !== '' && this.album.sources.length > 0) {
      this.album.name = this.albumName;
      this.savePressed = true;
      this.questionForConfirmation = {
        text: 'confirmationQuestionSaveAlbum'
      };
    } else {
      this.savePressed = false;
      this.albumName === '' ? this.errName = true : this.errName = false ;
      this.album.sources.length === 0 ? this.errImg = true : this.errImg = false;
    }
  }

  public suggestToCancel(): void {
    this.questionForConfirmation = {
      text: 'confirmationQuestionCancel'
    };
    this.savePressed = false;
  }

  private deleteImage(_id) {
    this.serverGetter.delete(`${urls.api.prod.images}/${_id}`).subscribe(data => {
      this.album.sources = this.album.sources.filter( item => {
        return item['id'] !== data.id;
      });
    });


  } public decideAboutVoting(answer: boolean): void {
  this.questionForConfirmation = null;
  this.reactOnQuestion(answer);
}

  private reactOnQuestion(answer) {
    if (this.savePressed && answer) {
      this.save();
    } else if (this.savePressed && !answer) {
      this.questionForConfirmation = null;
    } else if (!this.savePressed && answer) {
      this.router.navigate([ '/admin/gallery' ]);
    }
  }

  private save(): void {
    let observer;
    if (this.album.id !== '') {
      observer = this.serverGetter.update(`${urls.api.prod.albums}/${this.album.id}`, this.album);
    } else {
      observer = this.serverGetter.post(urls.api.prod.albums, this.album, {});
    }

    observer.subscribe(
      () => {
        this.router.navigate([ 'admin/gallery' ]);
      },
      err => console.error
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }

}
