import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsManagementPageComponent } from './documents-management-page.component';

describe('DocumentsManagementPageComponent', () => {
  let component: DocumentsManagementPageComponent;
  let fixture: ComponentFixture<DocumentsManagementPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsManagementPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
