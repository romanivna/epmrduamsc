import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent } from './spinner.component';
import { SpinnerService } from '../../../../shared/services/spinner/spinner.service';
import { NgForNumberPipe } from './pipes/ng-for-number.pipe';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  let spinnerService: SpinnerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerComponent, NgForNumberPipe ],
      providers: [ SpinnerService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    spinnerService = TestBed.get(SpinnerService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when init', () => {
    it('should not show spinner by default', () => {
      spinnerService.show = false;
      spinnerService.onStateChange.subscribe(state => expect(state).toBeFalsy());
    });
  });

  describe('when get event on change spinner state', () => {
    it('should applications new state to inner property', () => {
      spinnerService.show = true;
      spinnerService.onStateChange.subscribe(state => expect(state).toBeTruthy());
    });
  });
});
