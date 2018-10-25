import { RadioGroupFieldComponent } from './radio-group-field.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';


describe('RadioGroupFieldComponent', () => {
  let component: RadioGroupFieldComponent;
  let fixture: ComponentFixture<RadioGroupFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RadioGroupFieldComponent, MockLocalizatorPipe],
      imports: [ReactiveFormsModule, FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioGroupFieldComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      testControl: new FormControl()
    });
    component.radio = {
      ctrlName: 'testControl'
    };
    component.radios = [{
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

