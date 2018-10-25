import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';

import { DateBoxComponent } from './date-box.component';
import {
  Http,
  ConnectionBackend,
  RequestOptions,
  BaseRequestOptions
} from '@angular/http';

import { ServerGetterService } from '../../../../shared/services/server-getter/server-getter.service';
import { SpinnerService } from '../../../../shared/services/spinner/spinner.service';
import { LocalizatorPipe } from '../../../../shared/pipes';
import { LocalizatorService } from '../../../../shared/services';
import { DetectBrowserService } from './../../../../shared/services';

describe('DateBoxComponent', () => {
  let component: DateBoxComponent;
  let fixture: ComponentFixture<DateBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DateBoxComponent,
        LocalizatorPipe
      ],
      providers: [
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        ServerGetterService,
        Http,
        SpinnerService,
        LocalizatorService,
        DetectBrowserService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
