import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsemblesPreviewComponent } from './ensembles-preview.component';
import { LocalizatorPipe } from '../../../../shared/pipes';
import { RouterLinkStubDirective } from '../../../../shared/tests/router-stub';
import { EnsemblesItemPreviewComponent, ConfirmationModalWindowComponent } from '..';
import { ServerGetterService, SpinnerService, DetectBrowserService, LocalizatorService } from '../../../../shared/services';
import { Http, ConnectionBackend, BaseRequestOptions, RequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ActivatedRoute } from '@angular/router';

describe('EnsemblesPreviewComponent', () => {
  let component: EnsemblesPreviewComponent;
  let fixture: ComponentFixture<EnsemblesPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EnsemblesPreviewComponent,
        EnsemblesItemPreviewComponent,
        ConfirmationModalWindowComponent,
        LocalizatorPipe,
        RouterLinkStubDirective,
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
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        ServerGetterService,
        SpinnerService,
        DetectBrowserService,
        LocalizatorService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnsemblesPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
