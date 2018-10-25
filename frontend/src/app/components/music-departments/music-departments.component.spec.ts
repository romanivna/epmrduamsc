import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ConnectionBackend, RequestOptions, BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

import { MusicDepartmentsComponent } from './music-departments.component';
import { ServerGetterService } from '../../shared/services/server-getter/server-getter.service';
import { EducationType } from './declarations/music-departments-item-preview.model';
import { urls } from '../../shared/constants/index';
import { SpinnerService } from '../../shared/services/spinner/spinner.service';
import { DetectBrowserService, HideScrollElementService, LocalizatorService } from '../../shared/services';
import { SafeHtmlPipe } from '../../modules/mscommon-module/pipes';
import { RouterLinkStubDirective } from '../../shared/tests/router-stub';
import { LocalizatorPipe } from '../../shared/pipes';

describe('MusicDepartmentsComponent', () => {
  let component: MusicDepartmentsComponent;
  let fixture: ComponentFixture<MusicDepartmentsComponent>;
  let serverGetterService: ServerGetterService;

  const educationMock: EducationType[] = [{
    id: 1,
    name: 'choral conductor department',
    description: 'lolem  keksum',
    educationTypeId: 2,
    img: {
      id: '0',
      link: '',
      title: ''
    },
    title: 'mock',
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MusicDepartmentsComponent, SafeHtmlPipe, RouterLinkStubDirective, LocalizatorPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        ServerGetterService,
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        Http,
        SpinnerService,
        DetectBrowserService,
        HideScrollElementService,
        LocalizatorService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicDepartmentsComponent);
    component = fixture.componentInstance;
    serverGetterService = TestBed.get(ServerGetterService);
  });

  describe('On server getter service success', () => {
    beforeEach(() => {
      spyOn(serverGetterService, 'get').and.returnValue(
        Observable.create(observer => {
          observer.next({ data: educationMock });
        })
      );
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should append departments', () => {
      expect(component.education.length).toBe(0);
      component.education = educationMock;
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.education.length).toBe(1);
      });
    });

    // it('should make get request for more items on onNextItemsClick', () => {
    //   const url = urls.api.prod.departments;
    //   const mockParams = {};

    //   spyOn(component, 'makeParams').and.returnValue(mockParams);
    //   component.onNextItemsClick();
    //   expect(serverGetterService.get).toHaveBeenCalledWith(url, mockParams);
    // });

    it('should unsubscribe on component destroy', () => {
      let subscriptions = [];

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        subscriptions = (component as any).subscriptions;
        subscriptions.forEach(item => {
          spyOn(item, 'unsubscribe');
        });

        component.ngOnDestroy();
        fixture.detectChanges();
        subscriptions.forEach(item => {
          expect(item.unsubscribe).toHaveBeenCalled();
        });
      });
    });

    // it('all items should be loaded after second request', () => {
    //   component.onNextItemsClick();
    //   component.onNextItemsClick();
    //   expect(component.isAllItemsLoaded).toBeTruthy();
    // });
  });

  describe('On server getter service error', () => {
    const mockErrMsg = 'On server getter service error';

    beforeEach(() => {
      spyOn(serverGetterService, 'get').and.returnValue(
        Observable.create(observer => {
          observer.error(mockErrMsg);
        })
      );
      spyOn(console, 'error');
    });

    it('should console error been called', () => {
      component.changeLanguage();
      fixture.detectChanges();
      expect(console.error).toHaveBeenCalledWith(mockErrMsg);
    });
  });
});
