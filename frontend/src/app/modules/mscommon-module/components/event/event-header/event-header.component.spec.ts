import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

import { EventHeaderComponent } from './event-header.component';
import { DateToStringPipe } from '../../../pipes/date-to-string.pipe';
import { ImageUrlCreatorPipe } from '../../../pipes';

describe('EventHeaderComponent', () => {
  let component: EventHeaderComponent;
  let fixture: ComponentFixture<EventHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EventHeaderComponent,
        DateToStringPipe,
        ImageUrlCreatorPipe,
        MockLocalizatorPipe
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventHeaderComponent);
    component = fixture.componentInstance;
    component.event = {
      title: 'event',
      place: 'Kyiv',
      time: {
        from: '9:00 A.M.',
        to: '3:00 P.M.'
      },
      date: {
        start: 1481234400000,
        end: ''
      },
      img: {
        id: '0',
        link: 'assets/img/news/preview/0.jpg',
        title: ''
      }
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


@Pipe({ name: 'localizator' })
class MockLocalizatorPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}
