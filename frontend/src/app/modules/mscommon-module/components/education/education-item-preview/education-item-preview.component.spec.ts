import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationItemPreviewComponent } from './education-item-preview.component';
import { RouterLinkStubDirective } from '../../../../../shared/tests/router-stub';
import { LocalizatorPipe } from '../../../../../shared/pipes';
import { RouteNormalizerPipe } from '../../../pipes';
import { Router, ActivatedRoute } from '@angular/router';
import { MockRouter, MockActivatedRoute } from '../../../../../shared/tests/mock-routes';
import { Pipe, PipeTransform } from '@angular/core';

describe('EducationItemPreviewComponent', () => {
  let component: EducationItemPreviewComponent;
  let fixture: ComponentFixture<EducationItemPreviewComponent>;
  let mockRouter: MockRouter;

  beforeEach(async(() => {
    mockRouter = new MockRouter();
    TestBed.configureTestingModule({
      declarations: [
        EducationItemPreviewComponent,
        MockLocalizatorPipe,
        RouterLinkStubDirective,
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: MockActivatedRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationItemPreviewComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
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
