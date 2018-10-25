import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Http, ConnectionBackend, RequestOptions, BaseRequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { MockActivatedRoute, MockRouter } from '../../../../shared/tests/mock-routes';

import { MockBackend } from '@angular/http/testing';
import { EventCreatingComponent } from './event-creating.component';
import { ServerGetterService,
         EditorInsertImageService,
         SpinnerService,
         DetectBrowserService,
         LocalizatorService,
         DragAndDropService
        } from '../../../../shared/services';
import { ImageUrlCreatorPipe } from '../../../mscommon-module/pipes';
import { AdminModule } from '../../';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { DpDatePickerModule } from 'ng2-date-picker';
import { Ng2ImgMaxService, ImgMaxSizeService, ImgMaxPXSizeService } from 'ng2-img-max';
import { ImgExifService } from 'ng2-img-max/dist/src/img-exif.service';
import { Ng2PicaService } from 'ng2-pica';
import { GaleryNotificationsService } from 'app/services';


const millis = 1510092000000;
const earlyDate = '01.11.2017 00:00';
const date = '08.11.2017 00:00';
const startDate = '08.08.2018 00:00';
const endDate = '09.08.2018 00:00';

const mockedEvent = {
  img: {
    id: '0',
    link: 'http://mock/mock.jpg',
    title: ''
  },
  id: 0,
  lang: [],
  date: [ '0' ],
  header: 'mock',
  title: 'mock',
  description: 'mock',
  place: {
    name: '',
    link: '',
    address: ''
  },
  time: { }
};

describe('EventCreatingComponent', () => {
  let component: EventCreatingComponent;
  let fixture: ComponentFixture<EventCreatingComponent>;
  let mockRouter: MockRouter;
  let mockActivatedRoute: any;
  let serverGetterService: ServerGetterService;
  let imgMaxService: Ng2ImgMaxService;
  let localizatorService: LocalizatorService;

  beforeEach(async(() => {
    mockActivatedRoute = new MockActivatedRoute({ id: '1' });
    mockRouter = new MockRouter();
    TestBed.configureTestingModule({
      imports: [ AdminModule,  BrowserAnimationsModule, DpDatePickerModule],
      declarations: [ MockLocalizatorPipe ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        ServerGetterService,
        EditorInsertImageService,
        Http,
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        { provide: Router, useValue: mockRouter },
        { provide: LocalizatorService, useClass: MockLocalizatorService },
        FormBuilder,
        SpinnerService,
        DragAndDropService,
        DetectBrowserService,
        ImgExifService,
        {provide: Ng2ImgMaxService, useValue: imgMaxService},
        ImgMaxSizeService,
        ImgExifService,
        ImgMaxPXSizeService,
        Ng2PicaService,
        SpinnerService,
        GaleryNotificationsService,
        ]
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCreatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serverGetterService = TestBed.get(ServerGetterService);
    imgMaxService = TestBed.get(Ng2ImgMaxService);
    component.DnD = <DragAndDropService>{
      addImage(event, eventData, isImgSelected, order) {
      },
      updateImg(data, target, order) {
      }
    };
    localizatorService = TestBed.get(LocalizatorService);
  });

  it('should invalid fields in form', () => {
    component.eventForm.get('title').setValue('');
    component.eventForm.get('header').setValue('');
    component.eventForm.get('content').setValue('mock');
    component.eventForm.get('dateFrom').setValue(startDate);
    component.eventForm.get('dateTo').setValue(endDate);
    component.eventForm.get('placeAddress').setValue('mock');
    component.eventForm.get('placeLink').setValue('mock');
    component.eventForm.get('placeName').setValue('mock');
    expect(component.findInvalidControls()).toEqual([ 'header', 'title' ]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should suggest to save event', () => {
    component.questionForConfirmation = null;
    component.suggestToSave();
    expect(component.questionForConfirmation).toBeDefined();
  });

  it('should get event', () => {
    component.loadData();
    fixture.detectChanges();
    fixture.whenStable().then(
      () => expect(component.event).toBeDefined
    );
  });


  it('should ask id user wants to leave', () => {
    component.questionForConfirmation = null;
    component.suggestToCancel();
    expect(component.questionForConfirmation).toBeDefined();
  });

  it('should update image on user select', () => {
    component.event = mockedEvent;
    component.updateImg({
      id: '1',
      link: 'http://mock/mock1.jpg',
      title: ''
    });
    expect(component.event.img.link).toBe('http://mock/mock1.jpg');
  });

  it('should show albums list to choose the image', () => {
    (component as any).imgSelection = false;
    component.showAlbums();
    expect((component as any).imgSelection).toBeTruthy();
  });

  it('should prepare content before updating', () => {
    component.event = mockedEvent;
    component.event.description = '[src]="0 | imageUrlCreator"';
    (component as any).prepareContent();
    expect(component.event.description.substring(component.event.description.length - 3)).toBe('/0"');
  });

  it('should initiate vouting', () => {
    const spy = spyOn(component, 'save');
    component.questionToSave = true;
    component.decideAboutVoting(true);
    expect(spy).toHaveBeenCalled();
  });

  it('should check data before sending', () => {
    spyOn((component as any).elementRef.nativeElement, 'querySelector')
      .and
      .returnValue({ value: '11' });
    component.event = {
      img: {
        id: '1',
        link: null,
        title: ''
      },
      lang: [],
      id: 0,
      date: [ date ],
      header: '',
      title: '',
      description: '',
      place: {
        name: '',
        link: '',
        address: ''
      },
      time: { }
    };
    expect(component.isValid()).toBeFalsy();
  });

  it('should load event data', () => {
    spyOn(serverGetterService, 'get').and.returnValue(Observable.create((observer) => {
      observer.next(mockedEvent);
    }));
    fixture.detectChanges();
    fixture.whenStable().then(
      () => expect(component.event).toBeDefined
    );
  });

  it('should save form data', () => {
    component.eventForm.get('title').setValue('1');
    component.eventForm.get('header').setValue('1');
    component.eventForm.get('content').setValue('1');
    component.eventForm.get('dateFrom').setValue(date);
    component.eventForm.get('dateTo').setValue(date);
    component.eventForm.get('placeAddress').setValue('1');
    component.eventForm.get('placeLink').setValue('1');
    component.eventForm.get('placeName').setValue('1');
    component.save();
    expect(component.event.header).toBe('1');
    expect(component.event.title).toBe('1');
    expect(component.event.date[0]).toBe(millis);
    expect(component.event.date[1]).toBe(millis);
    expect(component.event.description).toBe('1');
    expect(component.event.place.address).toBe('1');
    expect(component.event.place.link).toBe('1');
    expect(component.event.place.name).toBe('1');
  });

  it('should send image to server before adding to view', () => {
    const fd = {
      append: function(name: string, path: string, token: string) {
        return { file: '' };
      }
    };
    const e = {
      target: {
        files: [ '' ],
        value: 'test\\test\\test'
      }
    };
    const reader = {
      readAsDataURL: function(path: string) {
        this.onloadend({});
      }
    };
    spyOn(window, 'FileReader').and.returnValue(reader);
    spyOn(window, 'FormData').and.returnValue(fd);
    const spy = spyOn(serverGetterService, 'post').and.returnValue(Observable.create((observer) => {
      observer.next({ id: '0' });
    }));
    component.addImage(e);
    fixture.whenStable().then(() => expect(spy).toHaveBeenCalled());
  });

  it('should return true if event end date before event start date', () => {
    component.eventForm.get('dateFrom').setValue(date);
    component.eventForm.get('dateTo').setValue(earlyDate);
    expect(component.isEndBeforeStart()).toBeTruthy();
  });

  it('should return true if event date from the past', () => {
    component.eventForm.get('dateFrom').setValue(date);
    expect(component.isEventFromPast()).toBeTruthy();
  });


});


@Pipe({ name: 'localizator' })
class MockLocalizatorPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}

class MockLocalizatorService extends LocalizatorService {
  constructor() {
    super(null);
  }
  currentLocaleObservable() {
    return Observable.of('ru');
  }

  translate(s: string): string {
    return s;
  }
}

