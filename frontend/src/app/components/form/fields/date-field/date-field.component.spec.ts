import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { DpDatePickerModule } from 'ng2-date-picker';
import { LocalizatorService } from '../../../../shared/services/localizator';


import { DateFieldComponent } from './date-field.component';
import { Observable } from 'rxjs/Observable';

const langId = 'ru';
describe('DateFieldComponent', () => {
  let component: DateFieldComponent;
  let fixture: ComponentFixture<DateFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateFieldComponent, MockLocalizatorPipe],
      imports: [ReactiveFormsModule, FormsModule, DpDatePickerModule],
      providers: [{provide: LocalizatorService, useClass: MockLocalizatorService}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateFieldComponent);
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

  it('should change locale when language changed', () => {
    component.ngOnInit();
    expect(component.datePickerConfig.locale).toEqual(langId);
    }
  );
});


@Pipe({name: 'localizator'})
class MockLocalizatorPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}

class MockLocalizatorService extends LocalizatorService {
  constructor() {
    super(null);
  }

  currentLocaleObservable() {
    return Observable.of(langId);
  }
}
