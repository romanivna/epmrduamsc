import { ActivatedRoute, Params, Data } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {} from '@types/jasmine';
import 'rxjs/add/observable/of';


export class MockActivatedRoute extends ActivatedRoute {
  params: Observable<Params>;
  data: Observable<Data>;

  constructor(parameters?: { [key: string]: any; }, dataVal?: { [key: string]: any; }) {
    super();
    this.params = Observable.of(parameters);
    this.data = Observable.of(dataVal);
  }
}

export class MockRouter {
  navigate = jasmine.createSpy('navigate');
}
