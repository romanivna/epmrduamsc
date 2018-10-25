import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersPreviewItemComponent } from './teachers-preview-item.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ImageUrlCreatorPipe } from '../../../modules/mscommon-module/pipes';


describe('TeachersPreviewItemComponent', () => {
  let component: TeachersPreviewItemComponent;
  let fixture: ComponentFixture<TeachersPreviewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TeachersPreviewItemComponent,
        ImageUrlCreatorPipe
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersPreviewItemComponent);
    component = fixture.componentInstance;


    component.teacher = {
      id: 2,
      firstName: 'nina',
      lastName: 'vetrenko',
      photo: {
        id: '0',
        link: 'assets/img/teacher.jpg',
        title: ''
      },
      department: ['mock'],
      position: 'teacher',
      about: 'mock mock mock',
      lang: 'uk',
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
