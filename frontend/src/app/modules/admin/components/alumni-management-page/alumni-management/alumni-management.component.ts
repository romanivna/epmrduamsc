import { Component, OnInit } from '@angular/core';
import { ServerGetterService, LocalizatorService } from '../../../../../shared/services';
import { urls, configurations } from '../../../../../shared/constants';
import { AlumniItem } from '../../../../../components/alumni/declarations';
import { Alumnies } from '../../../../../declarations/alumni';

@Component({
  selector: 'app-alumni-management',
  templateUrl: './alumni-management.component.html',
  styleUrls: ['./alumni-management.component.scss']
})
export class AlumniManagementComponent implements OnInit {
  public alumni;
  public allItemsLoaded = false;
  public showItemsFrom: any = 0;
  private currentLang: string;
  private deletingAlumnusId: any;
  private confirmQuestion;
  public itemsLimit: any = configurations.alumni.loadItemsPerFirstRequest;

  constructor ( public serverGetterService: ServerGetterService,
                private localizatorService: LocalizatorService ) {
    this.alumni = [];
  }

  ngOnInit () {
    this.localizatorService.currentLocaleObservable ().subscribe ( data => {
      this.alumni = [];
      this.showItemsFrom = 0;
      this.currentLang = data;
      this.getAlumni ();
    } );
  }

  private getAlumni (): void {
    const URLSearchParams = {
      '_start': this.showItemsFrom,
      '_limit': this.itemsLimit
    };
    this.serverGetterService
      .get<Alumnies> ( `${urls.api.prod.alumni}?_lang=${this.currentLang}`, URLSearchParams )
      .subscribe ( {
        next: this.onLoadAlumni.bind ( this ),
        error: this.onLoadAlumniError
      } );
  }

  private onLoadAlumni ( res ): void {
    this.alumni = this.alumni.concat ( res.data );
    this.showItemsFrom += this.itemsLimit;
    if ( res.data.length < this.itemsLimit ) {
      this.allItemsLoaded = true;
    }
    this.itemsLimit = configurations.alumni.loadItemsPerRequest;
  };

  private onLoadAlumniError ( error ): void {
    console.log ( error );
  }

  public onNextAlumniItemsClick () {
    this.getAlumni ();
  }

  public voteForDeleting ( answer: boolean ): void {
    this.confirmQuestion = null;
    if ( answer ) {
      this.serverGetterService.delete( `${urls.api.prod.alumni}/${this.deletingAlumnusId}` )
        .subscribe ( () => {
          this.alumni = [];
          this.showItemsFrom = 0;
          this.getAlumni ();
        },
          err => console.error
        );
    }
    this.deletingAlumnusId = '';
  }

  public deleteAlumni ( _id ) {
    this.deletingAlumnusId = _id;
    const deletedAlumnusName = this.alumni.filter(item => item.id === _id)[0].name;
    this.confirmQuestion = {
      text: 'Delete alumnus',
      itemHeader: ` ${deletedAlumnusName}`,
      itemName: '?'
    };
  }
}
