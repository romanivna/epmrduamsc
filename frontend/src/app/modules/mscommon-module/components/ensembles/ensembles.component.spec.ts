import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsemblesComponent } from './ensembles.component';
import { TitleComponent } from '..';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LocalizatorPipe } from '../../../../shared/pipes';
import { RouteNormalizerPipe } from '../../pipes';
import { RouterLinkStubDirective } from '../../../../shared/tests/router-stub';
import { ServerGetterService, LocalizatorService, SpinnerService, DetectBrowserService } from '../../../../shared/services';
import { Http, ConnectionBackend, BaseRequestOptions, RequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('EnsemblesComponent', () => {
  let component: EnsemblesComponent;
  let fixture: ComponentFixture<EnsemblesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EnsemblesComponent,
        TitleComponent,
        LocalizatorPipe,
        RouteNormalizerPipe,
        RouterLinkStubDirective,
      ],
      providers: [
        Http,
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        ServerGetterService,
        SpinnerService,
        LocalizatorService,
        DetectBrowserService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnsemblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
