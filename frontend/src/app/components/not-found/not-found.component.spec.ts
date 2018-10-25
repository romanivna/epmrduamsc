import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        NotFoundComponent,
        MockLocalizatorPipe
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

@Pipe({ name: 'localizator' })
class MockLocalizatorPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}
