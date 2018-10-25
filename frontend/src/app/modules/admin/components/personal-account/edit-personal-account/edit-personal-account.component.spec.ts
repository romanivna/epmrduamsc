import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersonalAccountComponent } from './edit-personal-account.component';

describe('EditPersonalAccountComponent', () => {
  let component: EditPersonalAccountComponent;
  let fixture: ComponentFixture<EditPersonalAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPersonalAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPersonalAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
