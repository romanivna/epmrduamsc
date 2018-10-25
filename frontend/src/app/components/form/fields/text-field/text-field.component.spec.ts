import { TextFieldComponent } from './text-field.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { MaskedInputDirective } from 'angular2-text-mask';


describe('TextFieldComponent', () => {
  let component: TextFieldComponent;
  let fixture: ComponentFixture<TextFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextFieldComponent, MockLocalizatorPipe, MaskedInputDirective],
      imports: [ReactiveFormsModule, FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFieldComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      testControl: new FormControl()
    });
    component.field = {
      ctrlName: 'testControl'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default value on focus if default value is present', () => {
    const defaultValue = 'testDefaultValue';
    const inputMock = {value: null};
    component.field = {valueDefault: defaultValue};
    component.setDefaultValueIfEmpty(inputMock);
    expect(inputMock.value).toEqual(defaultValue);
  });
});


@Pipe({name: 'localizator'})
class MockLocalizatorPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}

