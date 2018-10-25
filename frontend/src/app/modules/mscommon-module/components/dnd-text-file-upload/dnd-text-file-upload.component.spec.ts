import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DndTextFileUploadComponent } from './dnd-text-file-upload.component';
import { LocalizatorPipe } from '../../../../shared/pipes';
import { LocalizatorService, ServerGetterService, SpinnerService, DetectBrowserService } from '../../../../shared/services';
import { Http, ConnectionBackend, RequestOptions, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('DndTextFileUploadComponent', () => {
  let component: DndTextFileUploadComponent;
  let fixture: ComponentFixture<DndTextFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DndTextFileUploadComponent,
        LocalizatorPipe,
      ],
      providers: [
        Http,
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        LocalizatorService,
        ServerGetterService,
        SpinnerService,
        DetectBrowserService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DndTextFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
