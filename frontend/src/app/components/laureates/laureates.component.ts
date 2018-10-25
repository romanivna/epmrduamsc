import { Component, OnInit } from '@angular/core';
import { urls, configurations } from '../../shared/constants';
import { ServerGetterService } from '../../shared/services';

@Component({
  selector: 'app-laureates',
  templateUrl: 'laureates.template.html',
  styleUrls: ['laureates.styles.scss']
})
export class LaureatesComponent implements OnInit {
  public laureates = [];
  public allItemsLoaded = false;
  public showItemsFrom: any = 0;
  public itemsLimit: any = configurations.laureates.loadItemsPerFirstRequest;

  constructor(public serverGetterService: ServerGetterService) { }

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
      // .get( `${urls.api.prod.laureates}`)
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

  public onNextLaureateItemsClick () {
    this.getLaureates ();
  }

}
