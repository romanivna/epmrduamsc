import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaureatesManagementPageComponent } from './laureates-management-page.component';

describe('LaureatesManagementPageComponent', () => {
  let component: LaureatesManagementPageComponent;
  let fixture: ComponentFixture<LaureatesManagementPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaureatesManagementPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaureatesManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
