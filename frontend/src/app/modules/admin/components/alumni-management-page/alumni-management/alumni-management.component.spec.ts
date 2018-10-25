import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumniManagementComponent } from './alumni-management.component';
import { LocalizatorPipe } from '../../../../../shared/pipes';
import { RouterLinkStubDirective } from '../../../../../shared/tests/router-stub';
import { ShowNextButtonComponent, ConfirmationModalWindowComponent } from '../../../../mscommon-module/components';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ServerGetterService, SpinnerService, DetectBrowserService, LocalizatorService } from '../../../../../shared/services';
import { Http, ConnectionBackend, RequestOptions, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('AlumniManagementComponent', () => {
  let component: AlumniManagementComponent;
  let fixture: ComponentFixture<AlumniManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlumniManagementComponent,
        ShowNextButtonComponent,
        ConfirmationModalWindowComponent,
        LocalizatorPipe,
        RouterLinkStubDirective,
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
    fixture = TestBed.createComponent(AlumniManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
