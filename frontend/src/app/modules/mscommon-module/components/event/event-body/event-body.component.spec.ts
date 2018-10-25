import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { EventBodyComponent } from './event-body.component';
import { SafeHtmlPipe } from '../../../pipes';

describe('EventBodyComponent', () => {
  let component: EventBodyComponent;
  let fixture: ComponentFixture<EventBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EventBodyComponent,
        SafeHtmlPipe
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventBodyComponent);
    component = fixture.componentInstance;
    component.event = {
      title: 'event',
      description: 'event'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly choose a selected image', () => {
    const source = 'assets/img/news/preview/0.jpg';
    component.selectedImg = null;
    component.onImageClick({
      target: {
        src: source,
        getAttribute(attr: string) {
          return this[attr];
        }
      }
    });
    expect(component.selectedImg).toEqual(source);
  });

});
