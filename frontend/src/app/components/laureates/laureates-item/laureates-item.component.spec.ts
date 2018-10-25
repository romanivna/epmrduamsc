import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaureatesItemComponent } from './laureates-item.component';

describe('LaureatesItemComponent', () => {
  let component: LaureatesItemComponent;
  let fixture: ComponentFixture<LaureatesItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaureatesItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaureatesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
