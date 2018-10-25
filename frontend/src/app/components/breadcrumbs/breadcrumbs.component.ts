import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd, PRIMARY_OUTLET} from '@angular/router';
import {BreadcrumbsService} from './breadcrumbs.service';
import {LocalizatorService} from '../../shared/services/localizator';

export const ROUTE_DATA_BREADCRUMB = 'breadcrumb';
export const ROUTE_PARAM_BREADCRUMB = 'breadcrumb';
export const PREFIX_BREADCRUMB = 'prefixBreadcrumb';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  public breadcrumbs = {};
  public currentBreadcrumbs = [];
  public breadCrumbLabel = '';
  public url = '';
  public currentRoute: any;
  public isEnglish = false;
  private localeSubscription;
  private subscriptions = [];

  hasParams(breadcrumb) {
    return Object
      .keys(breadcrumb.params)
      .length
      ? [breadcrumb.url, breadcrumb.params]
      : [breadcrumb.url];
  }

  constructor( private breadcrumbService: BreadcrumbsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private localizatorService: LocalizatorService ) {}

  ngOnInit() {
    this.subscriptions.push(this.breadcrumbService
      .get()
      .subscribe( breadcrumbs => {
        this.breadcrumbs = breadcrumbs;
      }));

    this.subscriptions.push(this
      .router
      .events
      .filter( this.checkPrototype )
      .subscribe( event => {
        this.url = '';
        this.currentBreadcrumbs = [];
        this.currentRoute = this.activatedRoute.root;
        const _loop_1 = () => {
          const childrenRoutes = this.currentRoute.children;
          childrenRoutes.forEach( route => {
            this.currentRoute = route;
            if (route.outlet !== PRIMARY_OUTLET) { return; }
            this.setBreadcrumb(this.hasData(route), this.hasDynamicBreadcrumb(route), route);
          });
          this
            .breadcrumbService
            .store(this.currentBreadcrumbs);
        };
        while (this.currentRoute.children.length > 0) {
          _loop_1();
        }
      }));

      this.subscriptions.push(this.localeSubscription = this.localizatorService.currentLocaleObservable().subscribe(lang => {
        if (lang === 'en') {
          this.isEnglish = true;
        } else {
          this.isEnglish = false;
        }
      }));
  }

  checkPrototype(event) {
    return event instanceof NavigationEnd;
  }

  hasData(route) {
    return route.routeConfig && route.routeConfig.data;
  }

  hasDynamicBreadcrumb(route) {
    return route
      .snapshot
      .params
      .hasOwnProperty(ROUTE_PARAM_BREADCRUMB);
  }

  setBreadcrumb(hasData, hasDynamicBreadcrumb, route) {
    if (hasData || hasDynamicBreadcrumb) {
      this.setBreadcrumbLabel(hasDynamicBreadcrumb, route);

      const routeURL = this.setRouteUrl(route);
      this.url += '/' + routeURL;

      if (routeURL.length === 0) {
        route.snapshot.params = {};
      }
      // if breadcrumb label is an id of element we clear it and than in breadcrumbs.service set it to title of element
      if (typeof +this.breadCrumbLabel === 'number' && !isNaN(+this.breadCrumbLabel) ) {
        this.breadCrumbLabel = '';
      }

      const breadcrumb = this.setCurrentBreadcrumbs(this.breadCrumbLabel, route.snapshot.params, this.url);

      this.makeCurrentBreadcrumbs(route, breadcrumb);
    }
  }

  setCurrentBreadcrumbs(label, params, url) {
    return { label, params, url };
  }

  setBreadcrumbLabel(hasDynamicBreadcrumb, route) {
    if (hasDynamicBreadcrumb) {
      this.breadCrumbLabel = route
        .snapshot
        .params[ROUTE_PARAM_BREADCRUMB]
        .replace(/_/g, ' ');
    } else if (route.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
      this.breadCrumbLabel = route
        .snapshot
        .data[ROUTE_DATA_BREADCRUMB];
    }
  }

  setRouteUrl(route) {
    return route
      .snapshot
      .url
      .map( segment => segment.path )
      .join('/');
  }

  makeCurrentBreadcrumbs(route, breadcrumb) {
    if (route.snapshot.data.hasOwnProperty(PREFIX_BREADCRUMB)) {
      this.breadcrumbService.storePrefixed(breadcrumb);
    } else {
      this.currentBreadcrumbs.push(breadcrumb);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
};
