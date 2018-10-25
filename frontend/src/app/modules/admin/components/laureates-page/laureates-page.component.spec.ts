import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaureatesPageComponent } from './laureates-page.component';

describe('LaureatesPageComponent', () => {
  let component: LaureatesPageComponent;
  let fixture: ComponentFixture<LaureatesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaureatesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaureatesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
