import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { TeachersComponent } from './teachers.component';
import { TitleComponent } from '../../modules/mscommon-module/components';
import { RouteNormalizerPipe } from '../../modules/mscommon-module/pipes';
import { RouterLinkStubDirective } from '../../shared/tests/router-stub';
import { Router, ActivatedRoute } from '@angular/router';
import { MockRouter } from '../../shared/tests/mock-routes';
import { Observable } from 'rxjs/Observable';


describe('TeachersComponent', () => {
  let component: TeachersComponent;
  let fixture: ComponentFixture<TeachersComponent>;
  let mockRouter: MockRouter;

  beforeEach(async(() => {
    mockRouter = new MockRouter();
    TestBed.configureTestingModule({
      declarations: [
        TeachersComponent,
        TitleComponent,
        RouteNormalizerPipe,
        RouterLinkStubDirective,
        MockLocalizatorPipe
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute,
          useValue: {
            children: [{
              data: Observable.of({ id: 'mock' })
            }]
          }
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersComponent);
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
