import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import { NewsPreviewComponent } from './news-preview.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {
  Http,
  BaseRequestOptions,
  RequestOptions,
  ConnectionBackend
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { configurations } from '../../../../shared/constants/index';
import { SpinnerService } from '../../../../shared/services/spinner/spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MockRouter } from '../../../../shared/tests/mock-routes';

import { ServerGetterService } from '../../../../shared/services';
import { Observable } from 'rxjs/Observable';
import { LocalizatorPipe } from '../../../../shared/pipes';
import { LocalizatorService } from '../../../../shared/services';
import { DetectBrowserService } from '../../../../shared/services';
import 'rxjs/add/observable/from';

const _ = {
  id: 0,
  img: 0,
  date: 222,
  header: '333',
  content: '444'
};

const newsItem = _;

describe('NewsPreviewComponent', () => {
  let component: NewsPreviewComponent;
  let fixture: ComponentFixture<NewsPreviewComponent>;

  let mockRouter: MockRouter;
  let serverGetterService: ServerGetterService;

  beforeEach(async(() => {
    mockRouter = new MockRouter();

    TestBed.configureTestingModule({
      declarations: [ NewsPreviewComponent, LocalizatorPipe ],
      providers: [
        SpinnerService,
        Http,
        ServerGetterService,
        {provide: ConnectionBackend, useClass: MockBackend},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: [ { extended: true } ]
            }
          }
        },
        {provide: RequestOptions, useClass: BaseRequestOptions},
        {provide: Router, useValue: mockRouter},
        LocalizatorService,
        DetectBrowserService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serverGetterService = TestBed.get(ServerGetterService);
    spyOn(serverGetterService, 'get').and.returnValue(Observable.create((observer) => {
      observer.next({ data: _ });
    }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show news items', () => {
    const _length = (component as any).showNewsItemsFrom;
    component.onNextNewsItemsClick();
    expect((component as any).showNewsItemsFrom).toBeGreaterThan(_length);
  });

  it('should show next news items', () => {
    const startShowNewsItemsFromValue = (component as any).showNewsItemsFrom;
    component.onNextNewsItemsClick();
    expect((component as any).showNewsItemsFrom).toEqual(startShowNewsItemsFromValue + configurations.newsPreview.loadNewsItemsPerRequest);
  });

  it('should get news from server', () => {
    const initialNewsCountLength = component.news.length;
    (component as any).applyLoadedNews({ data: newsItem });
    expect(component.news.length).toEqual(initialNewsCountLength + 1);
  });

  it('should set that all news loaded if there no news on server', () => {
    (component as any).applyLoadedNews({ data: [newsItem] });
    expect(component.allNewsLoaded).toBeTruthy();
  });


  it('should check if all news loaded', () => {
    const spy = spyOn(component, 'isAllNewsLoaded');
    (component as any).applyLoadedNews({ data: [newsItem] });
    expect(spy).toHaveBeenCalled();
  });

  it('should suggest to remove news item with chosen id', () => {
    component.news[0] = newsItem;
    component.suggestToRemove(0);
    expect(component.questionForConfirmation.itemHeader).toBe(' \'333\' ');
  });

  it('should remove item if user desides so', () => {
    (component as any).removedNewsItem = 0;
    spyOn((component as any).serverGetterService, 'delete')
          .and
          .returnValue(Observable.create((observer) => {
            observer.next('successfuly deleted');
          }));
    component.decideAboutRemoving(true);
    fixture.whenStable().then(() => {
      expect(component.news.length).toBe(0);
    });
  });

  it('should not remove news item if user desides so', () => {
    (component as any).removedNewsItem = 0;
    component.decideAboutRemoving(false);
    expect((component as any).removedNewsItem).toBeNull();
  });
});
