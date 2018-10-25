import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherManagementPageComponent } from './teacher-management-page.component';
import { TitleComponent } from '../../../mscommon-module/components';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LocalizatorPipe } from '../../../../shared/pipes';
import { RouteNormalizerPipe } from '../../../mscommon-module/pipes';
import { RouterLinkStubDirective } from '../../../../shared/tests/router-stub';
import { LocalizatorService,
         ServerGetterService,
         SpinnerService,
         DetectBrowserService
        } from '../../../../shared/services';
import { Http, ConnectionBackend, RequestOptions, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('TeacherManagementPageComponent', () => {
  let component: TeacherManagementPageComponent;
  let fixture: ComponentFixture<TeacherManagementPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TeacherManagementPageComponent,
        TitleComponent,
        LocalizatorPipe,
        RouteNormalizerPipe,
        RouterLinkStubDirective,
      ],
      providers: [
        Http,
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        LocalizatorService,
        ServerGetterService,
        SpinnerService,
        DetectBrowserService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
