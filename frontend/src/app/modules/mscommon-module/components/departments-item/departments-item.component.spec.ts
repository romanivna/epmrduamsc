import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsItemComponent } from './departments-item.component';
import { SafeHtmlPipe } from '../../../../shared/pipes/safe-html.pipe';
import { ModalWindowComponent, SpinnerComponent, NgForNumberPipe } from '..';
import { ServerGetterService, SpinnerService, DetectBrowserService } from '../../../../shared/services';
import { Http, ConnectionBackend, RequestOptions, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from '../../../../components/breadcrumbs/breadcrumbs.service';
import { ContentPreparatorService } from '../../services';
import { MockActivatedRoute } from '../../../../shared/tests/mock-routes';

describe('DepartmentsItemComponent', () => {
  let component: DepartmentsItemComponent;
  let fixture: ComponentFixture<DepartmentsItemComponent>;
  let mockActivatedRoute: any;

  beforeEach(async(() => {
    mockActivatedRoute = new MockActivatedRoute({ id: '1' });
    TestBed.configureTestingModule({
      declarations: [
        DepartmentsItemComponent,
        ModalWindowComponent,
        SpinnerComponent,
        SafeHtmlPipe,
        NgForNumberPipe,
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
    fixture = TestBed.createComponent(DepartmentsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
