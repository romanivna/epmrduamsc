import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServerGetterService } from './../../shared/services';
import { urls, configurations } from './../../shared/constants';
import { AlumniItem } from './declarations';
import { Alumni } from '../../declarations/alumni';
import { LocalizatorService } from '../../shared/services/localizator/localizator.service';

@Component({
  selector: 'app-alumni-page',
  templateUrl: 'alumni.template.html',
  styleUrls: ['alumni.styles.scss']
})
export class AlumniComponent implements OnInit, OnDestroy {
  public alumni: Array<Alumni> = [];
  public activeItem: Alumni;
  public allItemsLoaded = false;
  public showModal = false;
  private showItemsFrom = 0;
  private currentLang: string;
  private subscriptions = [];
  private itemsLimit = configurations.alumni.loadItemsPerFirstRequest;

  constructor(private serverGetterService: ServerGetterService,
              private localizatorService: LocalizatorService) {
  }
  ngOnInit() {
    this.subscriptions.push(this.localizatorService.currentLocaleObservable().subscribe(data => {
      this.alumni = [];
      this.currentLang = data;
      this.showItemsFrom = 0;
      this.getAlumni();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }

  private getAlumni(): void {
    const URLSearchParams = {
      '_start': this.showItemsFrom,
      '_limit': this.itemsLimit
    };

    this.serverGetterService
      .get<AlumniItem[]>(`${urls.api.prod.alumni}?_lang=${this.currentLang}`, URLSearchParams)
      .subscribe({
        next: this.onLoadAlumni.bind(this),
        error: this.onLoadAlumniError
      });
  }

  private onLoadAlumni(res): void {
    this.alumni = this.alumni.concat(res.data);
    this.showItemsFrom += this.itemsLimit;
    if (res.data.length < this.itemsLimit) {
      this.allItemsLoaded = true;
    }
    this.itemsLimit = configurations.alumni.loadItemsPerRequest;
  };

  private onLoadAlumniError(error): void {
    console.log(error);
  }

  public onNextAlumniItemsClick() {
    this.getAlumni();
  }

}
