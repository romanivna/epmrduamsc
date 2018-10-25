import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsItemPreviewComponent } from './departments-item-preview.component';
import { RouterLinkStubDirective } from '../../../../../shared/tests/router-stub';
import { LocalizatorPipe } from '../../../../../shared/pipes';
import { SpinnerComponent, NgForNumberPipe } from '../..';
import { Router } from '@angular/router';
import { MockRouter } from '../../../../../shared/tests/mock-routes';
import { SpinnerService } from '../../../../../shared/services';

describe('DepartmentsItemPreviewComponent', () => {
  let component: DepartmentsItemPreviewComponent;
  let fixture: ComponentFixture<DepartmentsItemPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DepartmentsItemPreviewComponent,
        SpinnerComponent,
        RouterLinkStubDirective,
        LocalizatorPipe,
        NgForNumberPipe,
       ],
       providers: [
         { provide: Router, useClass: MockRouter },
         SpinnerService,
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentsItemPreviewComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
