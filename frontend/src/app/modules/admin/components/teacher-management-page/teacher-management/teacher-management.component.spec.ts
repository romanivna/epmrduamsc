import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherManagementComponent } from './teacher-management.component';
import { FormsModule } from '@angular/forms';
import { LocalizatorPipe } from '../../../../../shared/pipes';
import { RouterLinkStubDirective } from '../../../../../shared/tests/router-stub';
import { ShowNextButtonComponent, ConfirmationModalWindowComponent } from '../../../../mscommon-module/components';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ServerGetterService, SpinnerService, DetectBrowserService, LocalizatorService } from '../../../../../shared/services';
import { Http, ConnectionBackend, RequestOptions, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('TeacherManagementComponent', () => {
  let component: TeacherManagementComponent;
  let fixture: ComponentFixture<TeacherManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        TeacherManagementComponent,
        ShowNextButtonComponent,
        ConfirmationModalWindowComponent,
        RouterLinkStubDirective,
        LocalizatorPipe,
      ],
      providers: [
        Http,
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        ServerGetterService,
        SpinnerService,
        DetectBrowserService,
        LocalizatorService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
