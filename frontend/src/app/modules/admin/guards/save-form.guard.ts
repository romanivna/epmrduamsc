import { Injectable } from '@angular/core';
import {CanDeactivate, Router, ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Observable';

export interface CanComponentDeactivate {
  routeGo;
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class SaveFormGuard implements CanDeactivate<CanComponentDeactivate> {


  canDeactivate(component: CanComponentDeactivate): any {
    return component.canDeactivate ? component.canDeactivate()  : true;

  }
}
