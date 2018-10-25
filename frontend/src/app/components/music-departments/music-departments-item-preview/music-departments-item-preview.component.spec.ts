import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Http, BaseRequestOptions, ConnectionBackend, RequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { MusicDepartmentsItemPreviewComponent } from './music-departments-item-preview.component';
import { RouteNormalizerPipe } from '../../../modules/mscommon-module/pipes';
import { RouterLinkStubDirective } from '../../../shared/tests/router-stub';
import { MusicDepartmentsItemPreview } from '../declarations/music-departments-item-preview.model';
import { ServerGetterService } from './../../../shared/services';
import { SpinnerService } from '../../../shared/services/spinner/spinner.service';
import { DetectBrowserService } from '../../../shared/services';

import { LocalizatorPipe } from './../../../shared/pipes';
import { LocalizatorService } from './../../../shared/services';
describe('MusicDepartmentsItemPreviewComponent', () => {
  let component: MusicDepartmentsItemPreviewComponent;
  let fixture: ComponentFixture<MusicDepartmentsItemPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MusicDepartmentsItemPreviewComponent,
        RouterLinkStubDirective,
        RouteNormalizerPipe,
        LocalizatorPipe
      ],
      providers: [
        ServerGetterService,
        SpinnerService,
        {provide: ConnectionBackend, useClass: MockBackend},
        {provide: RequestOptions, useClass: BaseRequestOptions},
        Http,
        LocalizatorService,
        DetectBrowserService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const department: MusicDepartmentsItemPreview = {
      id: 1,
      head_id: '1',
      name: 'choral conductor department',
      description: 'lolem  keksum',
      img: {
        id: '0',
        link: '',
        title: ''
      },
    };

    fixture = TestBed.createComponent(MusicDepartmentsItemPreviewComponent);
    component = fixture.componentInstance;
    component.musicDepartmentsItemPreview = department;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be with department preview defined', () => {
    expect(component.musicDepartmentsItemPreview).toBeDefined();
  });
});
