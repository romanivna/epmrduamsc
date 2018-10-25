import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowNextButtonComponent } from './show-next-button.component';

describe('ShowNextButtonComponent', () => {
  let component: ShowNextButtonComponent;
  let fixture: ComponentFixture<ShowNextButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowNextButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowNextButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit when clicked', () => {
    const spy = spyOn(component.showNext, 'emit');

    const _: any = 'mock event';

    component.onClick(_);

    expect(spy).toHaveBeenCalled();
  });
});
