import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterLinkStubDirective, RouterStub } from './../../../shared/tests/router-stub';
import { Http, BaseRequestOptions, ConnectionBackend, RequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ServerGetterService, LocalizatorService } from './../../../shared/services';
import { EnsembleItemComponent } from './ensemble-item.component';
import { SpinnerService } from '../../../shared/services/spinner/spinner.service';
import { DetectBrowserService } from './../../../shared/services';
import { Observable } from 'rxjs/Observable';
import { Ensemble } from '../../../declarations';

const mockEnsembles = [{
  'id': 1,
  'name': 'mock',
  'description': 'mock mock',
  'img': {
    'id': '22',
    'link': 'mockLink',
    'title': 'string',
  }
}];

describe('EnsembleItemComponent', () => {
  let component: EnsembleItemComponent;
  let fixture: ComponentFixture<EnsembleItemComponent>;
  let serverGetterService: ServerGetterService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EnsembleItemComponent,
        RouterLinkStubDirective,
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              url: [ { path: 'symphony-orchestra' } ]
            }
          }
        },
        {provide: ConnectionBackend, useClass: MockBackend},
        {provide: RequestOptions, useClass: BaseRequestOptions},
        SpinnerService,
        DetectBrowserService,
        ServerGetterService,
        Http,
        LocalizatorService,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnsembleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serverGetterService = TestBed.get(ServerGetterService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve data', () => {
    spyOn(serverGetterService, 'get').and.returnValue(Observable.create((observer) => {
      observer.next(mockEnsembles);
    }));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.ensembles).toBeDefined;
    });
  });

  // it('should show error message in case of problems', () => {
  //   const spy = spyOn(console, 'error');

  //   (component as any).onLoadEnsembleError();
  //   expect(spy).toHaveBeenCalled();
  // });
});
