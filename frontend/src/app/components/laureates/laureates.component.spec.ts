import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaureatesComponent } from './laureates.component';

describe('LaureatesComponent', () => {
  let component: LaureatesComponent;
  let fixture: ComponentFixture<LaureatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaureatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaureatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
