import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockAlbumsComponent } from './mock-albums.component';
import { SpinnerComponent, NgForNumberPipe } from '../../../mscommon-module/components';
import { SpinnerService, ServerGetterService, DetectBrowserService } from '../../../../shared/services';
import { Http, ConnectionBackend, RequestOptions, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('MockAlbumsComponent', () => {
  let component: MockAlbumsComponent;
  let fixture: ComponentFixture<MockAlbumsComponent>;
  let serverGetterService: ServerGetterService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockAlbumsComponent,
        SpinnerComponent,
        NgForNumberPipe,
      ],
      providers: [
        Http,
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        SpinnerService,
        ServerGetterService,
        DetectBrowserService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serverGetterService = TestBed.get((ServerGetterService));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
