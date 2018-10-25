import { SelectFieldComponent } from './select-field.component';


import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';


describe('SelectFieldComponent', () => {
  let component: SelectFieldComponent;
  let fixture: ComponentFixture<SelectFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectFieldComponent, MockLocalizatorPipe],
      imports: [ReactiveFormsModule, FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFieldComponent);
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
});


@Pipe({name: 'localizator'})
class MockLocalizatorPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}

