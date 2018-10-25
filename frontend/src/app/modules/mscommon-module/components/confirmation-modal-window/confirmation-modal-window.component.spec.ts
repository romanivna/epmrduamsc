import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationModalWindowComponent } from './confirmation-modal-window.component';

import { Pipe, PipeTransform } from '@angular/core';
import { LocalizatorService } from './../../../../shared/services/localizator';

describe('ConfirmationModalWindowComponent', () => {
  let component: ConfirmationModalWindowComponent;
  let fixture: ComponentFixture<ConfirmationModalWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationModalWindowComponent, MockLocalizatorPipe ],
      providers: [{provide: LocalizatorService, useClass: MockLocalizatorService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event when user agrees', () => {
    let expectedAnswer: boolean;
    component.onVoted.subscribe(
      (answer: boolean) => {
        expectedAnswer = answer;
      }
    );
    component.onAgree();
    expect(expectedAnswer).toBeTruthy();
  });

  it('should emit an event when user disagrees', () => {
    let expectedAnswer: boolean;
    component.onVoted.subscribe(
      (answer: boolean) => {
        expectedAnswer = answer;
      }
    );
    component.onAgree();
    expect(expectedAnswer).toBeTruthy();
  });
});

@Pipe({ name: 'localizator' })
class MockLocalizatorPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}


class MockLocalizatorService extends LocalizatorService {
  constructor() {
    super(null);
  }
}
