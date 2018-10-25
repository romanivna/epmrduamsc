import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, BaseRequestOptions, ConnectionBackend, RequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SpinnerService } from '../../shared/services/spinner/spinner.service';
import { VideosComponent } from './videos.component';
import { LocalizatorPipe } from './../../shared/pipes';
import { LocalizatorService } from './../../shared/services';
import { Observable } from 'rxjs/Observable';
import { ServerGetterService } from './../../shared/services';
import { DetectBrowserService } from './../../shared/services';

describe('VideosComponent', () => {
  let component: VideosComponent;
  let fixture: ComponentFixture<VideosComponent>;
  let serverGetterService: ServerGetterService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LocalizatorPipe,
        VideosComponent,
      ],
      providers: [
        Http,
        HttpClientModule,
        ServerGetterService,
        SpinnerService,
        DetectBrowserService,
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        LocalizatorService
      ],
      imports: [HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(VideosComponent);
    component = fixture.componentInstance;
    serverGetterService = TestBed.get(ServerGetterService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show pop up window after user has chosen the video', () => {
    const testObj = {
      resourceId: {
        kind: 'youtube#video',
        videoId: 'DXS49RJTkog'
      }
    };
    component.selectVideo(testObj);
    expect(component.showModal).toBeTruthy();
  });
  it('should retrieve  data', () => {
    const spy = spyOn(component, 'getVideos');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
  it('should called get service in getVideos', () => {
    const spy = spyOn(serverGetterService, 'get').and.callThrough();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(spy).toHaveBeenCalled();
    });
  });
});

