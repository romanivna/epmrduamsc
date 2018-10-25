import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ConnectionBackend, RequestOptions, BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { GeneralEducationPageComponent } from './general-education-page.component';
import { ServerGetterService } from '../../shared/services';
import { SpinnerService } from '../../shared/services/';
import { DetectBrowserService } from '../../shared/services';
import { Observable } from 'rxjs/Observable';

const mockTeacher = {
  description: 'Mock text',
  head_id: '222',
  id: '10',
  img: {
    id: '0',
    link: 'http://mock/mock.jpg',
    title: ''
  },
  name: 'azazazaza'
};

describe('GeneralEducationPageComponent', () => {
  let component: GeneralEducationPageComponent;
  let fixture: ComponentFixture<GeneralEducationPageComponent>;
  let serverGetterService: ServerGetterService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GeneralEducationPageComponent
      ],
      providers: [
        ServerGetterService,
        Http,
        {provide: ConnectionBackend, useClass: MockBackend},
        {provide: RequestOptions, useClass: BaseRequestOptions},
        SpinnerService,
        DetectBrowserService
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralEducationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serverGetterService = TestBed.get(ServerGetterService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get elementary education content from server', () => {
    spyOn(serverGetterService, 'get').and.returnValue(Observable.create((observer) => {
      observer.next({
        data: {
          description: 'Mock text',
          headTeacher: {
            name: 'mocked name',
            link: '#'
          }
        }
      });
    }));
    component.elementaryDivision = null;
    (component as any).getDivisions();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.elementaryDivision.description[0]).toBe('Mock text');
    });
  });

  it('should get musical education content from server', () => {
    spyOn(serverGetterService, 'get').and.returnValue(Observable.create((observer) => {
      observer.next({
        data: {
          description: 'Mock text',
          headTeacher: {
            name: 'mocked name',
            link: '#'
          }
        }
      });
      observer.error({
        message: 'error'
      });
    }));
    component.elementaryDivision = null;
    (component as any).getDivisions();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.musicalDivision.description[0]).toBe('Mock text');
    });
  });

  it('should get school director\'s name from server', () => {
    spyOn(serverGetterService, 'get').and.returnValue(Observable.create((observer) => {
      observer.next({
        data: {
          name: 'Mocked name',
          logo: 'Mocked Logo',
          director: 'director name'
        }
      });
      observer.error({
        message: 'error'
      });
    }));
    component.schoolInfo = null;
    (component as any).getDirector();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.schoolInfo.director).toBe('director name');
    });
  });

  it('should get music departments from server', () => {
    spyOn(serverGetterService, 'get').and.returnValue(Observable.create((observer) => {
      observer.next({
        data: [mockTeacher]
      });

    }));
    component.departments = null;
    (component as any).getDepartments();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.departments).toBeDefined();
    });
  });
});
