import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationPreviewComponent } from './education-preview.component';
import { TitleComponent, SpinnerComponent, NgForNumberPipe } from '..';
import { EducationItemPreviewComponent } from '../education';
import { RouterLinkStubDirective } from '../../../../shared/tests/router-stub';
import { LocalizatorPipe } from '../../../../shared/pipes';
import { RouteNormalizerPipe } from '../../pipes';
import { ServerGetterService, LocalizatorService, DetectBrowserService, SpinnerService } from '../../../../shared/services';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Http, ConnectionBackend, RequestOptions, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ActivatedRoute } from '@angular/router';
import { MSCommonModule } from '../..';
import { Pipe, PipeTransform } from '@angular/core';

describe('EducationPreviewComponent', () => {
  let component: EducationPreviewComponent;
  let fixture: ComponentFixture<EducationPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MSCommonModule],
      declarations: [ MockLocalizatorPipe ],
      providers: [
        Http,
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        { provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: [ { extended: true } ]
            }
          }
        },
        LocalizatorService,
        ServerGetterService,
        SpinnerService,
        DetectBrowserService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationPreviewComponent);
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
