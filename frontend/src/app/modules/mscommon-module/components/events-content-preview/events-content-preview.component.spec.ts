import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, BaseRequestOptions, ConnectionBackend, RequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLinkStubDirective } from '../../../../shared/tests/router-stub';
import { RouteNormalizerPipe } from '../../pipes';
import { EventsContentPreviewComponent } from './events-content-preview.component';
import { ServerGetterService } from './../../../../shared/services';
import { SpinnerService } from '../../../../shared/services/spinner/spinner.service';
import { DetectBrowserService } from './../../../../shared/services';
import { LocalizatorPipe } from './../../../../shared/pipes';
import { LocalizatorService } from './../../../../shared/services';
import { Observable } from 'rxjs/Observable';

const mockEvent = {
  'id': 202,
  'lang': ['en'],
  'header': 'Test header',
  'title': 'the society now has a stylesheet to guide editors in the layer',
  'date': ['1505682000000'],
  'time': {
    'from': '9:00 A.M.',
      'to': '3:00 P.M.'
  },
  'place': {
    'name': 'mock',
    'link': 'mock',
    'address': 'mock'
  },
  'img': {
    'id': '',
    'link': '',
    'title': ''
  }
};

const mockEvents = [
  {
    'id': 202,
    'lang': ['en'],
    'header': 'Test header',
    'title': 'the society now has a stylesheet to guide editors in the layer',
    'date': ['1505682000000'],
    'time': {
      'from': '9:00 A.M.',
        'to': '3:00 P.M.'
    },
    'place': {
      'name': 'mock',
      'link': 'mock',
      'address': 'mock'
    },
    'img': {
      'id': '',
      'link': '',
      'title': ''
    }
  },
  {
    'id': 203,
    'lang': ['en'],
    'header': 'Test header',
    'title': 'the society now has a stylesheet to guide editors in the layer',
    'date': ['1505682000000'],
    'time': {
      'from': '9:00 A.M.',
        'to': '3:00 P.M.'
    },
    'place': {
      'name': 'mock',
      'link': 'mock',
      'address': 'mock'
    },
    'img': {
      'id': '',
      'link': '',
      'title': ''
    }
  }
];

describe('EventsContentPreviewComponent', () => {
  let component: EventsContentPreviewComponent;
  let fixture: ComponentFixture<EventsContentPreviewComponent>;
  let serverGetterService: ServerGetterService;
  let localizatorService: LocalizatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        EventsContentPreviewComponent,
        RouterLinkStubDirective,
        RouteNormalizerPipe,
        LocalizatorPipe
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: [ { extended: true } ]
            }
          }
        },
        ServerGetterService,
        SpinnerService,
        DetectBrowserService,
        {provide: ConnectionBackend, useClass: MockBackend},
        {provide: RequestOptions, useClass: BaseRequestOptions},
        Http,
        LocalizatorService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(EventsContentPreviewComponent);
    component = fixture.componentInstance;
    serverGetterService = TestBed.get(ServerGetterService);
    localizatorService = TestBed.get(LocalizatorService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get events from server', () => {
    component.ngOnInit();
    fixture.whenStable().then(() => {
      (component as any).onLoadEvents({ data: mockEvents });
      expect(component.eventsContentPreviewItems.length).toBeDefined();
    });
  });

  it('should retrieve events', () => {
    const spy = spyOn(component, 'getEvents');

    component.onNextEventsItemsClick();
    expect(spy).toHaveBeenCalled();
  });

  it('should retrieve events data', () => {
    spyOn(localizatorService, 'currentLocaleObservable').and.returnValue(Observable.create((observer) => {
      observer.next('uk');
    }));
    const spy = spyOn(component, 'getEvents');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith();
  });


  it('should called get service in getEvents', () => {
    const data = {
      data: {
          map() {}
      }
    };
    const spy = spyOn(serverGetterService, 'get').and.returnValue(Observable.create((observer) => {
      observer.next(data);
    })).and.callThrough();
    component.onNextEventsItemsClick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should handle if error while loading events', () => {
    const spy = spyOn(console, 'log');

    (component as any).onLoadEventsError();
    expect(spy).toHaveBeenCalled();
  });

  it('should compare date correctly', () => {
    expect((component as any).isPastEvent(mockEvent)).toBeTruthy();
  });

  it('should behave correctly when two dates passed', () => {
    expect((component as any).isSecondDate([1, 2])).toBeTruthy();
  });

  it('should compare years correctly', () => {
    expect((component as any).isDatesInSameYear([1, 2])).toBeTruthy();
    expect((component as any).isDatesInSameYear([1, 1481320800000])).toBeFalsy();
  });

  it('should compare months correctly', () => {
    expect((component as any).isDatesInSameYear([1, 2])).toBeTruthy();
    expect((component as any).isDatesInSameYear([1, 1481320800000])).toBeFalsy();
  });

  it('should remove event', () => {
    spyOn(serverGetterService, 'delete').and.returnValue(Observable.create((observer) => {
      observer.next({ });
    }));
    spyOn(component, 'getEvents');
    component.remove(1);
    expect((component as any).getEvents).toHaveBeenCalled();
  });

  it('should suggest to remove event item with chosen header', () => {
    component.eventsContentPreviewItems = [];
    component.eventsContentPreviewItems[0] = mockEvent;
    component.suggestToRemove({
      stopPropagation: function() {},
      preventDefault: function() {}
    }, 202);
    expect(component.questionForConfirmation.itemHeader).toBe(' \'Test header\' ');
  });

  it('should remove item if user desides so', () => {
    (component as any).removedEventItem = 0;
    spyOn((component as any).serverGetterService, 'delete')
          .and
          .returnValue(Observable.create((observer) => {
            observer.next('successfuly deleted');
          }));
    component.decideAboutRemoving(true);
    fixture.whenStable().then(() => {
      expect(component.eventsContentPreviewItems.length).toBe(0);
    });
  });

  it('should not remove event item if user desides so', () => {
    (component as any).removedEventItem = 0;
    component.decideAboutRemoving(false);
    expect((component as any).removedEventItem).toBeNull();
  });

  describe('isMoreAvailable', () => {

    it('should not display "more" button if it is not more events on server ', () => {
      component.isArrowToLoadMore = true;
      component.allEventsLoaded = true;
      expect(component.onNextEventsItemsClick()).toBeFalsy();
    });

    it('should not display "more" button if we are not asking to whow arrow in events.component  ', () => {
      component.isArrowToLoadMore = false;
      expect(component.onNextEventsItemsClick()).toBeFalsy();
    });

    it('should display "more" button if it is more than 8 events on the page', () => {
      component.ngOnInit();
        fixture.whenStable().then(() => {
          component.eventsContentPreviewItems.length = 9;
          component.isArrowToLoadMore = true;
          component.allEventsLoaded = false;
          expect(component.onNextEventsItemsClick()).toBeTruthy();
        });
    });

    it('should not display "more" button if all Events has been loaded', () => {
      component.ngOnInit();
        fixture.whenStable().then(() => {
          component.eventsContentPreviewItems.length = 3;
          component.allEventsLoaded = true;
          expect(component.onNextEventsItemsClick()).toBeFalsy();
        });
    });

    it('should not display "more" button if it is 8 events on the page', () => {
      component.amountofelements = 8;
      component.allEventsLoaded = true;
      expect(component.onNextEventsItemsClick()).toBeFalsy();
      });
  });
});
