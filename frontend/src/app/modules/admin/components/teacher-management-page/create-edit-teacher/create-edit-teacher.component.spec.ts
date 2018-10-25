import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditTeacherComponent } from './create-edit-teacher.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalizatorPipe } from '../../../../../shared/pipes';
import { DndFileUploadComponent } from '../../../../mscommon-module/components';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LocalizatorService,
         ServerGetterService,
         SpinnerService,
         DetectBrowserService,
         EditorInsertImageService,
         DragAndDropService} from '../../../../../shared/services';
import { Http, ConnectionBackend, RequestOptions, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng2ImgMaxService, ImgMaxSizeService } from 'ng2-img-max';
import { MockActivatedRoute, MockRouter } from '../../../../../shared/tests/mock-routes';

  describe('CreateEditTeacherComponent', () => {
  let component: CreateEditTeacherComponent;
  let fixture: ComponentFixture<CreateEditTeacherComponent>;
  let imgMaxService: Ng2ImgMaxService;
  let mockActivatedRoute: any;
  let mockRouter: MockRouter;

  beforeEach(async(() => {
    mockRouter = new MockRouter();
    mockActivatedRoute = new MockActivatedRoute({ id: '1' });
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        CreateEditTeacherComponent,
        LocalizatorPipe,
        DndFileUploadComponent,
      ],
      providers: [
        Http,
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter},
        ServerGetterService,
        LocalizatorService,
        SpinnerService,
        DetectBrowserService,
        EditorInsertImageService,
        DragAndDropService,
        { provide: Ng2ImgMaxService, useValue: imgMaxService },
      ],
      schemas: [NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditTeacherComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    imgMaxService = TestBed.get(Ng2ImgMaxService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
