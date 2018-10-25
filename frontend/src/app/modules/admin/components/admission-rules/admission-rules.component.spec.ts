import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ServerGetterService,
        DragAndDropService,
        EditorInsertImageService,
        LocalizatorService,
        DetectBrowserService, } from '../../../../shared/services/';
import { AdmissionRulesComponent } from './admission-rules.component';
import { LocalizatorPipe, LocalizatorFromObjectPipe } from '../../../../shared/pipes';
import { SpinnerService } from '../../../../shared/services/spinner/spinner.service';
import { MockActivatedRoute, MockRouter } from '../../../../shared/tests/mock-routes';
import { Router, ActivatedRoute } from '@angular/router';
import { ContentPreparatorService } from '../../../mscommon-module/services';
import { FormBuilder } from '@angular/forms';
import { Ng2ImgMaxService, ImgMaxSizeService, ImgExifService, ImgMaxPXSizeService} from 'ng2-img-max';




import { CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA } from '@angular/core';
import {
  Http,
  ConnectionBackend,
  RequestOptions,
  BaseRequestOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('AdmissionRulesComponent', () => {
  let component: AdmissionRulesComponent;
  let fixture: ComponentFixture<AdmissionRulesComponent>;
  let serverGetterService: ServerGetterService;
  let localizatorService: LocalizatorService;
  let mockRouter: MockRouter;
  let imgMaxService: Ng2ImgMaxService;
  let mockActivatedRoute: any;

  beforeEach(async(() => {
    mockActivatedRoute = new MockActivatedRoute({ id: '1' });
    mockRouter = new MockRouter();
    TestBed.configureTestingModule({
      declarations: [
        AdmissionRulesComponent,
        LocalizatorPipe,
        LocalizatorFromObjectPipe ],
      providers: [
        ServerGetterService,
        Http,
        SpinnerService,
        DetectBrowserService,
        EditorInsertImageService,
        DragAndDropService,
        FormBuilder,
        LocalizatorService,
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: Ng2ImgMaxService, useValue: imgMaxService },
        ContentPreparatorService,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serverGetterService = TestBed.get(ServerGetterService);
    localizatorService = TestBed.get(LocalizatorService);
    imgMaxService = TestBed.get(Ng2ImgMaxService);
    component.DnD = <DragAndDropService>{
      addImage(event, eventData, isImgSelected, order) {
      },
      updateImg(data, target, order) {
      }
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
