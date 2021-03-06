import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsemblesItemComponent } from './ensembles-item.component';
import { SafeHtmlPipe } from '../../../../shared/pipes/safe-html.pipe';
import { ModalWindowComponent } from '..';
import { ServerGetterService, SpinnerService, DetectBrowserService } from '../../../../shared/services';
import { Http, ConnectionBackend, BaseRequestOptions, RequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from '../../../../components/breadcrumbs/breadcrumbs.service';
import { ContentPreparatorService } from '../../services';
import { MockActivatedRoute } from '../../../../shared/tests/mock-routes';

describe('EnsemblesItemComponent', () => {
  let component: EnsemblesItemComponent;
  let fixture: ComponentFixture<EnsemblesItemComponent>;
  let mockActivatedRoute: MockActivatedRoute;

  beforeEach(async(() => {
    mockActivatedRoute = new MockActivatedRoute({ id: '1' });
    TestBed.configureTestingModule({
      declarations: [
        EnsemblesItemComponent,
        ModalWindowComponent,
        SafeHtmlPipe,
      ],
      providers: [
        Http,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        ServerGetterService,
        SpinnerService,
        DetectBrowserService,
        BreadcrumbsService,
        ContentPreparatorService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnsemblesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
