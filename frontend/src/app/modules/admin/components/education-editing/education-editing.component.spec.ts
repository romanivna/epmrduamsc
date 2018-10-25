import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationEditingComponent } from './education-editing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalizatorPipe } from '../../../../shared/pipes';
import { DndFileUploadComponent } from '../../../mscommon-module/components';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ServerGetterService,
         SpinnerService,
         DetectBrowserService,
         EditorInsertImageService,
         DragAndDropService,
         LocalizatorService } from '../../../../shared/services';
import { Http, ConnectionBackend, RequestOptions, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Ng2ImgMaxService, ImgMaxSizeService, ImgMaxPXSizeService, ImgExifService} from 'ng2-img-max';
import { ImgExifService as imgExifService, Ng2PicaService } from 'ng2-pica';
import { ActivatedRoute, Router } from '@angular/router';
import { MockRouter, MockActivatedRoute } from '../../../../shared/tests/mock-routes';
import { ContentPreparatorService } from '../../../mscommon-module/services';
import { AdminModule } from '../..';

describe('EducationEditingComponent', () => {
  let component: EducationEditingComponent;
  let fixture: ComponentFixture<EducationEditingComponent>;
  let mockActivatedRoute: any;

  beforeEach(async(() => {
    mockActivatedRoute = new MockActivatedRoute({ id: '1' });
    TestBed.configureTestingModule({
      imports: [ AdminModule, ReactiveFormsModule ],
      declarations: [ MockLocalizatorPipe ],
      providers: [
        Http,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
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
    fixture = TestBed.createComponent(EducationEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Pipe({ name: 'localizator' })
class MockLocalizatorPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}
