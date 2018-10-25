import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumniItemComponent } from './alumni-item.component';
import { SpinnerComponent, NgForNumberPipe } from '../../../modules/mscommon-module/components';
import { SpinnerService } from '../../../shared/services';
import { RouterLinkStubDirective } from '../../../shared/tests/router-stub';
import { Pipe, PipeTransform } from '@angular/core';

describe('AlumniItemComponent', () => {
  let component: AlumniItemComponent;
  let fixture: ComponentFixture<AlumniItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlumniItemComponent,
        SpinnerComponent,
        NgForNumberPipe,
        RouterLinkStubDirective,
      ],
      providers: [
        SpinnerService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumniItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
