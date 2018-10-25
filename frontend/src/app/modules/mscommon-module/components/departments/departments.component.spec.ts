import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsComponent } from './departments.component';
import { TitleComponent } from '..';
import { RouterLinkStubDirective } from '../../../../shared/tests/router-stub';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LocalizatorPipe } from '../../../../shared/pipes';
import { RouteNormalizerPipe } from '../../pipes';
import { LocalizatorService, ServerGetterService, SpinnerService, DetectBrowserService } from '../../../../shared/services';
import { Http, ConnectionBackend, RequestOptions, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('DepartmentsComponent', () => {
  let component: DepartmentsComponent;
  let fixture: ComponentFixture<DepartmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DepartmentsComponent,
        TitleComponent,
        RouterLinkStubDirective,
        LocalizatorPipe,
        RouteNormalizerPipe,
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
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
