import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWindowComponent } from './modal-window.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import createSpy = jasmine.createSpy;

describe('ModalWindowComponent', () => {
  let component: ModalWindowComponent;
  let fixture: ComponentFixture<ModalWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [ ModalWindowComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should listen to user click and emits if user clicks on close btn', () => {
    const spy = spyOn(component.close, 'emit');
    (component as any).onModalClick({contains: arg => arg === 'modal__close-btn' ? true : false});
    expect(spy).toHaveBeenCalled();
  });

  it('should listen to user click and emits if user clicks on modal background', () => {
    const spy = spyOn(component.close, 'emit');
    (component as any).onModalClick({contains: arg => arg === 'modal__content' ? true : false});
    expect(spy).toHaveBeenCalled();
  });
});
