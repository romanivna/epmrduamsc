import { NO_ERRORS_SCHEMA} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, ConnectionBackend, RequestOptions, BaseRequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MockBackend } from '@angular/http/testing';
import { FormBuilder } from '@angular/forms';
import { SpinnerService } from '../../../../shared/services/spinner/spinner.service';
import { DetectBrowserService } from '../../../../shared/services';
import { Observable } from 'rxjs/Observable';
import { MockActivatedRoute, MockRouter } from '../../../../shared/tests/mock-routes';
import { Pipe, PipeTransform } from '@angular/core';
import { NewsItemCreatingComponent } from './news-item-creating.component';
import { ImageUrlCreatorPipe } from '../../../mscommon-module/pipes/image-url-creator.pipe';
import { ServerGetterService, EditorInsertImageService } from '../../../../shared/services';
import { ContentPreparatorService } from '../../../mscommon-module/services';
import { LocalizatorService } from '../../../../shared/services/localizator';
import { DragAndDropService } from '../../../../shared/services/drag-and-drop/drag-and-drop.service';
import { Ng2ImgMaxService, ImgMaxSizeService, ImgExifService, ImgMaxPXSizeService} from 'ng2-img-max';
import { Ng2PicaService } from 'ng2-pica';
import { GaleryNotificationsService } from '../../../../services';

describe('NewsItemCreatingComponent', () => {
  let component: NewsItemCreatingComponent;
  let fixture: ComponentFixture<NewsItemCreatingComponent>;
  let mockRouter: MockRouter;
  let serverGetterService: ServerGetterService;
  let imgMaxService: Ng2ImgMaxService;
  let mockActivatedRoute: any;
  const mockedNewsItem = {
    lang: [],
    img: 0,
    id: 0,
    date: 0,
    header: 'mock',
    content: 'mock'
  };

  beforeEach(async(() => {
    mockRouter = new MockRouter();
    mockActivatedRoute = new MockActivatedRoute({ id: '1' });
    TestBed.configureTestingModule({
      declarations: [
        NewsItemCreatingComponent,
        ImageUrlCreatorPipe,
        MockLocalizatorPipe
      ],
      schemas: [NO_ERRORS_SCHEMA ],
      providers: [
        ServerGetterService,
        EditorInsertImageService,
        Http,
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: LocalizatorService, useClass: MockLocalizatorService },
        ContentPreparatorService,
        FormBuilder,
        SpinnerService,
        DragAndDropService,
        DetectBrowserService,
        {provide: Ng2ImgMaxService, useValue: imgMaxService},
        ImgMaxSizeService,
        ImgExifService,
        ImgMaxPXSizeService,
        Ng2PicaService,
        SpinnerService,
        GaleryNotificationsService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsItemCreatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serverGetterService = TestBed.get(ServerGetterService);
    component.DnD = <DragAndDropService>{
      addImage(event, eventData, isImgSelected, order) {
      },
      updateImg(data, target, order) {
      }
    };
    imgMaxService = TestBed.get(Ng2ImgMaxService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should suggest to save news item', () => {
    component.newsItemForm.setValue({
      title: 'title',
      content: 'title',
      isRussian: 'true',
      isUkrainian: 'true',
      isEnglish: 'true'
    });
    component.newsItem.img = '1';
    component.questionForConfirmation = null;
    component.suggestToSave();
    expect(component.questionForConfirmation.text).toBe('confirmationQuestionSaveNews');
    expect(component.questionToUpdate).toBeTruthy();
  });

  it('should ask id user wants to leave', () => {
    component.questionForConfirmation = null;
    component.suggestToCancel();
    expect(component.questionForConfirmation).toBeDefined();
  });

  it('should update image on user select', () => {
    component.newsItem = {
      lang: ['mock'],
      img: {
        id: '0',
        link: '',
        title: '',
      },
      id: 0,
      date: 0,
      header: 'mock',
      content: 'mock',
    };

    component.updateImg({
      id: '1',
      link: 'http://mock/mock.jpg',
      title: ''
    });
    expect(component.newsItem.img.link).toEqual('http://mock/mock.jpg');
  });

  it('should show albums list to choose the image', () => {
    (component as any).imgSelection = false;
    component.showAlbums();
    expect((component as any).imgSelection).toBeTruthy();
  });

  it('should save news item', () => {
    spyOn(serverGetterService, 'post').and.returnValue(Observable.create((observer) => {
      observer.next('successfully saved');
    }));
    spyOn((component as any).elementRef.nativeElement, 'querySelectorAll')
      .and
      .returnValue([ { value: '1' }, { value: '2' }, { value: '3' } ]);
    spyOn((component as any).elementRef.nativeElement, 'querySelector')
      .and
      .returnValue({ value: '1' });
    (component as any).questionToUpdate = true;
    component.newsItem = {
      lang: [],
      img: 0,
      id: 0,
      date: 0,
      header: 'mock',
      content: 'mock'
    };
    component.decideAboutVoting(true);
    fixture.whenStable().then(() => {
      expect((component as any).router).toHaveBeenCalled();
    });
  });

  it('should react on question', () => {
    const spy = spyOn(component, 'reactOnQuestion');
    component.decideAboutVoting(true);
    expect(spy).toHaveBeenCalledWith(true);
    this.questionToUpdate = false;
    component.decideAboutVoting(true);
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should load news data', () => {
    component.loadData();
    fixture.detectChanges();
    fixture.whenStable().then(
      () => expect(component.newsItem).toBeDefined
    );
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
    component.newsItem = {
      img: 0,
      id: 0,
      date: 0,
      header: 'mock',
      content: 'mock'
    };
    component.imgSelection = false;
    const reader = {
      readAsDataURL: function(path: string) {
        this.onloadend({});
      }
    };
    spyOn(window, 'FileReader').and.returnValue(reader);
    spyOn(window, 'FormData').and.returnValue(fd);
    // const spy = spyOn(serverGetterService, 'post').and.returnValue(Observable.create((observer) => {
    //   observer.next({ id: '0' });
    // }));
    component.addImage(e);
    fixture.whenStable().then(() => expect(component.DnD.updateImg)
      .toHaveBeenCalledWith(e, component.newsItem, component.imgSelection, undefined));
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
}
