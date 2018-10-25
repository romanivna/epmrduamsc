import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { DepartmentsComponent } from './departments.component';
import { ServerGetterService, LocalizatorService } from '../../../shared/services';
import { RouterLinkStubDirective } from '../../../shared/tests/router-stub';
import { RouteNormalizerPipe } from '../../../modules/mscommon-module/pipes';
import createSpyObj = jasmine.createSpyObj;

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { ImageUrlCreatorPipe } from '../../../modules/mscommon-module/pipes/image-url-creator.pipe';
import { LocalizatorPipe } from '../../../shared/pipes';
import { TitleComponent } from '../../../modules/mscommon-module/components';

describe('DepartmentsContentPreviewComponent', () => {
  let component: DepartmentsComponent;
  let fixture: ComponentFixture<DepartmentsComponent>;
  let ServerGetterServiceStub;

  beforeEach(async(() => {
    ServerGetterServiceStub = {
      get() {
        return Observable.create((observer) => {
          observer.next({
            data: [
              { name: 'department1', img: 'assets/img/violin.png' }
            ]
          });
          observer.next({
            data: [
              { name: 'department2', img: 'assets/img/piano.png' }
            ]
          });
          observer.error('error message testing');
        });
      }
    };
    TestBed.configureTestingModule({
      declarations: [
        DepartmentsComponent,
        ImageUrlCreatorPipe,
        RouterLinkStubDirective,
        RouteNormalizerPipe,
        LocalizatorPipe,
        TitleComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: ServerGetterService, useValue: ServerGetterServiceStub },
        LocalizatorService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn((component as any).serverGetterService, 'get').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
