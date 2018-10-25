import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { RouterLinkStubDirective } from '../../../../shared/tests/router-stub';
import { RouteNormalizerPipe } from '../../pipes';
import { LocalizatorPipe } from '../../../../shared/pipes';
import { TitleComponent } from './title.component';
import {
  ConnectionBackend,
  RequestOptions,
  BaseRequestOptions,
  Http
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { LocalizatorService } from './../../../../shared/services';

import { ServerGetterService } from './../../../../shared/services';
import { SpinnerService } from './../../../../shared/services/spinner';
import { DetectBrowserService } from './../../../../shared/services';

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TitleComponent,
        RouterLinkStubDirective,
        RouteNormalizerPipe,
        LocalizatorPipe],
      providers: [
        ServerGetterService,
        {provide: ConnectionBackend, useClass: MockBackend},
        {provide: RequestOptions, useClass: BaseRequestOptions},
        Http,
        SpinnerService,
        LocalizatorService,
        DetectBrowserService
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit on click', async(() => {
    fixture.detectChanges();
    const spy = spyOn(component.eventEmitter, 'emit');

    const button = fixture.debugElement.nativeElement.querySelector('.title .title__signature');
    button.click();

    fixture.whenStable().then(() => {
      expect(spy).toHaveBeenCalled();

    });
  }));

});
