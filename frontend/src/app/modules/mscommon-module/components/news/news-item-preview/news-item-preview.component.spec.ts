import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Router } from '@angular/router';
import {
  Http,
  ConnectionBackend,
  RequestOptions,
  BaseRequestOptions
} from '@angular/http';

import { RouterLinkStubDirective } from '../../../../../shared/tests/router-stub';

import { MockRouter } from '../../../../../shared/tests/mock-routes';
import { RouteNormalizerPipe, ImageUrlCreatorPipe } from '../../../pipes';

import { NewsItemPreviewComponent } from './news-item-preview.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ServerGetterService } from '../../../../../shared/services/server-getter/server-getter.service';
import { SpinnerService } from '../../../../../shared/services/spinner/spinner.service';
import { LocalizatorPipe } from '../../../../../shared/pipes';
import { LocalizatorService } from '../../../../../shared/services';

describe('NewsItemPreviewComponent', () => {
  let component: NewsItemPreviewComponent;
  let fixture: ComponentFixture<NewsItemPreviewComponent>;
  let mockRouter: MockRouter;

  beforeEach(async(() => {
    mockRouter = new MockRouter();

    TestBed.configureTestingModule({
      declarations: [
        NewsItemPreviewComponent,
        RouterLinkStubDirective,
        RouteNormalizerPipe,
        ImageUrlCreatorPipe,
        LocalizatorPipe
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        ServerGetterService,
        Http,
        SpinnerService,
        LocalizatorService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsItemPreviewComponent);
    component = fixture.componentInstance;

    const _ = {
      id: 0,
      img: {
        id: '0',
        link: '',
        title: ''
      },
      date: 222,
      header: '333',
      content: '444',
      lang: []
    };

    component.newsItem = _;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define limit of news item content length', () => {
    expect((component as any).newsItemContentMaxLength).toBe(256);
  });

  describe('when fetched news', () => {
    const mockNewsItemLong = `LongNewsItem LongNewsItem LongNewsItem LongNewsItem LongNewsItem LongNewsItem LongNewsItem
        LongNewsItem LongNewsItem LongNewsItem LongNewsItem LongNewsItem LongNewsItem LongNewsItem LongNewsItem 
        LongNewsItem LongNewsItem LongNewsItem LongNewsItem LongNewsItem LongNewsItem LongNewsItem`;

    const mockNewsItemShort = 'ShortNewsItem';

    it('should cut news item content if content length > defined constant value', () => {
      const result = (component as any).cutNewsItemContent(mockNewsItemLong);
      expect(result.length).toBeLessThan((component as any).newsItemContentMaxLength + 1);
    });

    it('shouldn\'t cut words in content', () => {
      const result = (component as any).cutNewsItemContent(mockNewsItemLong);
      console.log(result.slice(-5));
      expect(result.slice(-5)).toBe('m ...');
    });

    it('shouldn\'t cut news item content if content length <= defined constant value', () => {
      const result = (component as any).cutNewsItemContent(mockNewsItemShort);
      expect(result).toBe(mockNewsItemShort);
    });
  });

});
