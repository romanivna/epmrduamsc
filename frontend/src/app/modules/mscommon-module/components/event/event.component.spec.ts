import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {
  ConnectionBackend,
  RequestOptions,
  BaseRequestOptions,
  Http
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MockBackend } from '@angular/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { MockActivatedRoute, MockRouter } from '../../../../shared/tests/mock-routes';
import { SpinnerService, DetectBrowserService, ServerGetterService, LocalizatorService } from '../../../../shared/services/';

import { EventComponent } from './event.component';
import { BreadcrumbsService } from '../../../../components/breadcrumbs/breadcrumbs.service';

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;
  let mockActivatedRoute: MockActivatedRoute;
  let mockRouter: MockRouter;
  let serverGetterService: ServerGetterService;
  let breadcrumbsService: BreadcrumbsService;

  beforeEach(async(() => {
    mockActivatedRoute = new MockActivatedRoute({ 'id': '1' });
    mockRouter = new MockRouter();

    TestBed.configureTestingModule({
      declarations: [ EventComponent ],
      providers: [
        ServerGetterService,
        {provide: ConnectionBackend, useClass: MockBackend},
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: RequestOptions, useClass: BaseRequestOptions},
        {provide: Router, useValue: mockRouter},
        Http,
        SpinnerService,
        DetectBrowserService,
        BreadcrumbsService,
        LocalizatorService
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serverGetterService = TestBed.get(ServerGetterService);

    breadcrumbsService = TestBed.get(BreadcrumbsService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get an event from server', () => {
    component.event = null;
    (component as any).getEvent();
    fixture.detectChanges();
    expect(component.event).toBeDefined();
  });

  it('should correctly transform dates', () => {
    spyOn(serverGetterService, 'get').and.returnValue(Observable.create((observer) => {
      observer.next({ data: {
        title: 'event',
        place: 'Kyiv',
        date: [ 1481234400000, 1481234400000 ],
        img: 'assets/img/news/preview/0.jpg'
      }});
    }));
    spyOn(breadcrumbsService, 'setBreadcrumbToItemName');
    (component as any).getEvent();
    fixture.detectChanges();
    expect(component.event).toBeDefined();
  });

  it('should correctly transform dates', () => {
    spyOn(serverGetterService, 'get').and.returnValue(Observable.create((observer) => {
      observer.next({ data: {
        title: 'event',
        place: 'Kyiv',
        date: [ 1481234400000 ],
        img: 'assets/img/news/preview/0.jpg'
      }});
    }));
    spyOn(breadcrumbsService, 'setBreadcrumbToItemName');
    (component as any).getEvent();
    fixture.detectChanges();
    expect(component.event).toBeDefined();
  });
});
