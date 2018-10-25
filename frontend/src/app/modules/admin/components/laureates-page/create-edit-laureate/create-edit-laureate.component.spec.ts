import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditLaureateComponent } from './create-edit-laureate.component';

describe('CreateEditLaureateComponent', () => {
  let component: CreateEditLaureateComponent;
  let fixture: ComponentFixture<CreateEditLaureateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditLaureateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditLaureateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
