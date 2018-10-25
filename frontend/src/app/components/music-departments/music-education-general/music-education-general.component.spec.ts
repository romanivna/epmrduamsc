import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicEducationGeneralComponent } from './music-education-general.component';
import { SpinnerComponent, NgForNumberPipe } from '../../../modules/mscommon-module/components';
import { SpinnerService } from '../../../shared/services';

describe('MusicEducationGeneralComponent', () => {
  let component: MusicEducationGeneralComponent;
  let fixture: ComponentFixture<MusicEducationGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MusicEducationGeneralComponent,
        SpinnerComponent,
        NgForNumberPipe,
      ],
      providers: [
        SpinnerService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicEducationGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
