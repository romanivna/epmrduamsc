import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsemblesCreatingComponent } from './ensembles-creating.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalizatorPipe } from '../../../../shared/pipes';
import { DndFileUploadComponent } from '../../../mscommon-module/components';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ServerGetterService,
         SpinnerService,
         DetectBrowserService,
         EditorInsertImageService,
         DragAndDropService,
         LocalizatorService,
      } from '../../../../shared/services';
import { Http, ConnectionBackend, RequestOptions, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { MockRouter } from '../../../../shared/tests/mock-routes';
import { ContentPreparatorService } from '../../../mscommon-module/services';
import { Ng2ImgMaxService, ImgMaxSizeService, ImgExifService, ImgMaxPXSizeService} from 'ng2-img-max';
import { ImgExifService as imgExifService, Ng2PicaService} from 'ng2-pica';

describe('EnsemblesCreatingComponent', () => {
  let component: EnsemblesCreatingComponent;
  let fixture: ComponentFixture<EnsemblesCreatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [
        EnsemblesCreatingComponent,
        DndFileUploadComponent,
        LocalizatorPipe,
      ],
      providers: [
        Http,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: [ { extended: true } ]
            }
          }
        },
        { provide: Router, useClass: MockRouter },
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        ServerGetterService,
        SpinnerService,
        DetectBrowserService,
        EditorInsertImageService,
        DragAndDropService,
        Ng2ImgMaxService,
        ImgMaxSizeService,
        ImgExifService,
        imgExifService,
        ImgMaxPXSizeService,
        Ng2PicaService,
        ContentPreparatorService,
        LocalizatorService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnsemblesCreatingComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
