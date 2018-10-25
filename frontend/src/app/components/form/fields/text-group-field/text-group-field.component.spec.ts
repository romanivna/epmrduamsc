import { TextGroupFieldComponent } from './text-group-field.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { TextFieldComponent } from '../text-field/text-field.component';
import { MaskedInputDirective } from 'angular2-text-mask';

describe('TextGroupFieldComponent', () => {
  let component: TextGroupFieldComponent;
  let fixture: ComponentFixture<TextGroupFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextGroupFieldComponent, MockLocalizatorPipe, TextFieldComponent, MaskedInputDirective],
      imports: [ReactiveFormsModule, FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextGroupFieldComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      testControl: new FormControl({name: 'testControl'})
    });
    component.name = 'testGroupControl';
    component.fields = [{
      ctrlName: 'testControl'
    }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


@Pipe({name: 'localizator'})
class MockLocalizatorPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}

