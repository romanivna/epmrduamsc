import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, ConnectionBackend, RequestOptions, BaseRequestOptions } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockActivatedRoute, MockRouter } from '../../../../shared/tests/mock-routes';
import { MockBackend } from '@angular/http/testing';

import { NewsItemComponent } from './news-item.component';
import { Observable } from 'rxjs/Observable';
import { ImageUrlCreatorPipe, SafeHtmlPipe } from '../../pipes';
import { ContentPreparatorService } from '../../services';
import { LocalizatorPipe } from '../../../../shared/pipes';
import { LocalizatorService, DetectBrowserService, SpinnerService, ServerGetterService } from '../../../../shared/services';
import {BreadcrumbsService} from '../../../../components/breadcrumbs/breadcrumbs.service';

describe('NewsItemComponent', () => {
  let component: NewsItemComponent;
  let fixture: ComponentFixture<NewsItemComponent>;
  let mockActivatedRoute: any;
  let mockRouter: MockRouter;

  beforeEach(async(() => {
    mockActivatedRoute = new MockActivatedRoute({ id: '1' });
    mockRouter = new MockRouter();

    TestBed.configureTestingModule({
      declarations: [
        NewsItemComponent,
        ImageUrlCreatorPipe,
        SafeHtmlPipe,
        LocalizatorPipe
      ],
      providers: [
        ServerGetterService,
        Http,
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        { provide: Router, useValue: mockRouter },
        SpinnerService,
        ContentPreparatorService,
        LocalizatorService,
        DetectBrowserService,
        BreadcrumbsService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prepare content to display it correctly', () => {
    (component as any).ngcontent = '_ngcontent-c0';
    let content = '_ngcontent-c1 class="editor__1"';
    content = (component as any).prepareContent(content);
    expect(content).toBe('_ngcontent-c0 class="content-box__1"');
  });

});
