import { Component, OnInit } from '@angular/core';
import { configurations, urls } from '../../../../shared/constants/index';
import { ServerGetterService } from '../../../../shared/services/server-getter/server-getter.service';

@Component({
  selector: 'app-laureates-page',
  templateUrl: 'laureates-page.component.html',
  styleUrls: ['laureates-page.component.scss']
})
export class LaureatesPageComponent implements OnInit {
  public laureates = [];
  public allItemsLoaded = false;
  public showItemsFrom: any = 0;
  public itemsLimit: any = configurations.laureates.loadItemsPerFirstRequest;
  private confirmQuestion: any;
  private deletingLaureatesId: any;

  constructor( public serverGetterService: ServerGetterService ) { }

  ngOnInit() {
    this.getLaureates();
  }

  private getLaureates() {
    const URLSearchParams = {
      '_start': this.showItemsFrom,
      '_limit': this.itemsLimit
    };
    this.serverGetterService
      .get( `${urls.api.prod.laureates}`, URLSearchParams )
      .subscribe ( {
        next: this.onLoadLaureates.bind ( this ),
        error: this.onLoadLaureatesError
      } );
  }

  private onLoadLaureates ( res ): void {
    this.laureates = this.laureates.concat ( res.data );
    this.showItemsFrom += this.itemsLimit;
    if ( res.data.length < this.itemsLimit ) {
      this.allItemsLoaded = true;
    }
    this.itemsLimit = configurations.laureates.loadItemsPerRequest;
  };

  private onLoadLaureatesError ( error ): void {
    console.log ( error );
  }

  public onNextAlumniItemsClick () {
    this.getLaureates ();
  }


  public voteForDeleting ( answer: boolean ): void {
    this.confirmQuestion = null;
    if ( answer ) {
      this.serverGetterService.delete( `${urls.api.prod.laureates}/${this.deletingLaureatesId}` )
        .subscribe ( () => {
            this.laureates = [];
            this.showItemsFrom = 0;
            this.getLaureates ();
          },
          err => console.error(err)
        );
    }
    this.deletingLaureatesId = '';
  }

  public deleteAlumni ( _id ) {
    this.deletingLaureatesId = _id;
    const deletedAlumnusName = this.laureates.find(item => item.id === _id).name;
    this.confirmQuestion = {
      text: 'deleteChosenLaureate'
    };
  }

}
