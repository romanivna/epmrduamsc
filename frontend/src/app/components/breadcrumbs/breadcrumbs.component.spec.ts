import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router, convertToParamMap, ParamMap } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { BreadcrumbsComponent, ROUTE_DATA_BREADCRUMB, ROUTE_PARAM_BREADCRUMB, PREFIX_BREADCRUMB } from './breadcrumbs.component';
import { BreadcrumbsService } from './breadcrumbs.service';
import { ServerGetterService, LocalizatorService, SpinnerService, DetectBrowserService } from '../../shared/services';
import { Http, ConnectionBackend, RequestOptions, BaseRequestOptions } from '@angular/http';

const mockBreadcrumb = {
  label: 'video',
  params: {},
  url: '/video'
};

class MockRouter {
  public url;
  public root;
  private subject = new Subject();
  public events = this.subject.asObservable();

  navigate(url: string) {
    this.url = url;
    this.triggerNavEvents(url);
  }

  triggerNavEvents(url) {
    const ne = new NavigationEnd(0, url, null);
    this.subject.next(ne);
  }
}

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;
  let mockRouter: MockRouter;

  beforeEach(async(() => {
    mockRouter = new MockRouter();

    TestBed.configureTestingModule({
      declarations: [
        BreadcrumbsComponent,
        MockLocalizatorPipe
      ],
      providers: [
        Http,
        ConnectionBackend,
        { provide: RequestOptions, useClass: BaseRequestOptions },
        BaseRequestOptions,
        BreadcrumbsService,
        ServerGetterService,
        LocalizatorService,
        SpinnerService,
        DetectBrowserService,
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create breadcrumbs component', () => {
    expect(component).toBeTruthy();
  });

  it('should check parameters in breadcrumb', inject([BreadcrumbsService], (service: BreadcrumbsService) => {
    const mockValWithParams = component.hasParams({
      label: 'video',
      params: {
        [ROUTE_PARAM_BREADCRUMB]: '215'
      },
      url: '/video'
    });
    const mockValWithoutParams = component.hasParams({
      label: 'video',
      params: {},
      url: ''
    });
    expect(mockValWithoutParams[0]).toBeFalsy();
    expect(mockValWithParams.length).toBeTruthy();
  }));

  describe('BreadcrumbsComponent', () => {
    let activatedRoute;
    beforeEach(() => {
      activatedRoute = {
        snapshot: {
          params: {
            [ROUTE_PARAM_BREADCRUMB]: 'history_of'
          },
          data: {
            [ROUTE_DATA_BREADCRUMB]: 'history'
          },
          url: [{
            path: 'history'
          }]
        },
        routeConfig: {
          data: {}
        }
      };
    });

    it('should get breadcrumbs from service', inject([BreadcrumbsService], (service: BreadcrumbsService) => {
      service.store(mockBreadcrumb);
      component.ngOnInit();
      expect(component.breadcrumbs[0].label).toBe('video');
    }));

    it('should check whether the prototype property of a NavigationEnd appears anywhere in the prototype chain of an object', () => {
      const mockRouteClass = new NavigationEnd(0, '/video', null);
      expect(component.checkPrototype(mockRouteClass)).toBeTruthy();
    });

    it('should replace signal _ to empty string in breadcrumbs label', () => {
      component.breadCrumbLabel = 'history_of';
      component.setBreadcrumbLabel(true, activatedRoute);
      expect(component.breadCrumbLabel).toBe('history of');
    });

    it('should set breadcrumbs label', () => {
      component.breadCrumbLabel = '';
      component.setBreadcrumbLabel(false, activatedRoute);
      expect(component.breadCrumbLabel).toBe('history');
    });

    it('should make object of current breadcrumb', inject([BreadcrumbsService], (service: BreadcrumbsService) => {
      const spy = spyOn(service, 'storePrefixed');
      component.currentBreadcrumbs = [];
      activatedRoute.snapshot.data = {
        [PREFIX_BREADCRUMB]: 'mock'
      };
      component.makeCurrentBreadcrumbs(activatedRoute, mockBreadcrumb);
      expect(spy).toHaveBeenCalledWith(mockBreadcrumb);
      activatedRoute.snapshot.data = {};
      component.makeCurrentBreadcrumbs(activatedRoute, mockBreadcrumb);
      expect(component.currentBreadcrumbs.length).toBeTruthy();
    }));

    it('should set current breadcrumb', () => {
      const breadcrumb = component.setCurrentBreadcrumbs('video', '', '/video');
      expect(breadcrumb.label).toBe('video');
      expect(breadcrumb.url).toBe('/video');
    });

    it('should make current breadcrumb', () => {
      component.currentBreadcrumbs = [];
      component.setBreadcrumb(true, true, activatedRoute);
      expect(component.currentBreadcrumbs.length).toBe(1);
    });

    it('should not make current breadcrumb', () => {
      component.currentBreadcrumbs = [];
      component.setBreadcrumb(false, false, activatedRoute);
      expect(component.currentBreadcrumbs.length).toBe(0);
    });

    it('should check if route has dinamic breadcrumb', () => {
      expect(component.hasDynamicBreadcrumb(activatedRoute)).toBeTruthy();
    });

    it('should check if route has not dinamic breadcrumb', () => {
      activatedRoute.snapshot.params = {};
      expect(component.hasDynamicBreadcrumb(activatedRoute)).toBeFalsy();
    });

    it('should check if route config has data', () => {
      expect(component.hasData(activatedRoute)).toBeTruthy();
    });

    it('should set route url value', () => {
      let routeURL = '';
      routeURL = component.setRouteUrl(activatedRoute);
      expect(routeURL).toBeTruthy();
    });

    it('should reset parameters of active route', () => {
      component.currentBreadcrumbs = [];
      activatedRoute.snapshot.url = [];
      component.setBreadcrumb(true, true, activatedRoute);
      expect(activatedRoute.snapshot.params.hasOwnProperty(ROUTE_PARAM_BREADCRUMB)).toBeFalsy();
    });

  });
});

@Pipe({ name: 'localizator' })
class MockLocalizatorPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}
