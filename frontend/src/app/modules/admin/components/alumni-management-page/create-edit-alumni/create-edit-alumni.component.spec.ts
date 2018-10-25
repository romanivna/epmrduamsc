import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditAlumniComponent } from './create-edit-alumni.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { AdminModule } from '../../..';
import { DndFileUploadComponent,
         ConfirmationModalWindowComponent,
         SpinnerComponent,
         NgForNumberPipe,
        } from '../../../../mscommon-module/components';
import { AlbumsModalWindowComponent } from '../..';
import { MockAlbumsComponent } from '../../mock-albums/mock-albums.component';
import { LocalizatorService,
         ServerGetterService,
         SpinnerService,
         DetectBrowserService,
         EditorInsertImageService,
         DragAndDropService
        } from '../../../../../shared/services';
import { Http, BaseRequestOptions, ConnectionBackend, RequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { MockActivatedRoute, MockRouter } from '../../../../../shared/tests/mock-routes';
import { Ng2ImgMaxService } from 'ng2-img-max';

describe('CreateEditAlumniComponent', () => {
  let component: CreateEditAlumniComponent;
  let fixture: ComponentFixture<CreateEditAlumniComponent>;
  let mockActivatedRoute: MockActivatedRoute;
  let mockRouter: MockRouter;
  let imgMaxService: Ng2ImgMaxService;

  beforeEach(async(() => {
    mockActivatedRoute = new MockActivatedRoute({ id: '1' });
    mockRouter = new MockRouter();
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        CreateEditAlumniComponent,
        MockLocalizatorPipe,
        DndFileUploadComponent,
        AlbumsModalWindowComponent,
        MockAlbumsComponent,
        ConfirmationModalWindowComponent,
        SpinnerComponent,
        NgForNumberPipe,
      ],
      providers: [
        Http,
        { provide: Router, useValue: mockRouter },
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        { provide: LocalizatorService, useValue: MockLocalizatorService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Ng2ImgMaxService, useValue: imgMaxService },
        SpinnerService,
        ServerGetterService,
        DetectBrowserService,
        EditorInsertImageService,
        DragAndDropService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditAlumniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    imgMaxService = TestBed.get(Ng2ImgMaxService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make onInit', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.ngOnInit).toBeTruthy();
  });

});

@Pipe({name: 'localizator'})
class MockLocalizatorPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}

class MockLocalizatorService extends LocalizatorService {
  constructor() {
    super(null);
  }
}
