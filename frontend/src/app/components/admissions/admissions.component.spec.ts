import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionsComponent } from './admissions.component';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { DateFieldComponent } from '../form/fields/date-field/date-field.component';
import { RadioGroupFieldComponent } from '../form/fields/radio-group-field/radio-group-field.component';
import { SelectFieldComponent } from '../form/fields/select-field/select-field.component';
import { TextFieldComponent } from '../form/fields/text-field/text-field.component';
import { TextGroupFieldComponent } from '../form/fields/text-group-field/text-group-field.component';
import { DndFileUploadComponent } from '../../modules/mscommon-module/components/dnd-file-upload/dnd-file-upload.component';
import { DocumentsListComponent } from '../documents-list/documents-list.component';
import { MaskedInputDirective } from 'angular2-text-mask';
import { ServerGetterService } from '../../shared/services/server-getter/server-getter.service';
import { BaseRequestOptions, Http, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { SpinnerService } from '../../shared/services/spinner/spinner.service';
import { FileUploadService } from '../../shared/services/index';
import { DetectBrowserService } from '../../shared/services';
import { applicantsGradeFormFielder } from './constants';
import { DpDatePickerModule } from 'ng2-date-picker';
import { NgForNumberPipe, SpinnerComponent } from '../../modules/mscommon-module/components';

describe('AdmissionsComponent', () => {
  let component: AdmissionsComponent;
  let fixture: ComponentFixture<AdmissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdmissionsComponent,
        MockLocalizatorPipe,
        DateFieldComponent,
        RadioGroupFieldComponent,
        SelectFieldComponent,
        TextFieldComponent,
        TextGroupFieldComponent,
        DndFileUploadComponent,
        MaskedInputDirective,
        DocumentsListComponent,
        NgForNumberPipe,
        SpinnerComponent,
      ],
      imports: [ReactiveFormsModule, FormsModule, DpDatePickerModule],
      providers: [
        ServerGetterService,
        SpinnerService,
        MockBackend,
        BaseRequestOptions,
        FileUploadService,
        DetectBrowserService,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
            (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate correct age for grade', function () {
    const birthDayControl = new FormControl();
    const result = component.validateBirthdayForGrade(birthDayControl);
    component.gradeFormGroup.get('grade').setValue('Grade 1');
    birthDayControl.setValue(('01.01' + (new Date().getFullYear() - 6)));
    expect(result).toBeNull();
  });

  it('should set correct init data', function () {
    component.ngOnInit();
    expect(component.applicantsGradeForm).toEqual(applicantsGradeFormFielder);
  });

  it('should copy address', function () {
    const town = 'Zhashkiv';
    component.applicantsFormGroup.get('permanentAddress').get('addressLine').setValue(town);
    component.copyStudentAddressToParent();
    const parentAddressLine = component.parentFormGroup.get('permanentAddress').get('addressLine').value;
    expect(parentAddressLine).toEqual(town);
  });

  it ('should set previous form', function () {
    const currentForm = new FormGroup({});
    component.prevForm(currentForm);
    expect(component.currentFormGroup).toEqual(currentForm);
  });

  it ('should set next form when prev form valid', function () {
    component.gradeFormGroup.get('grade').setValue('Grade 1');
    component.nextForm(component.applicantsFormGroup);
    expect(component.step).toEqual(1);
  });

  it ('should not set next form when prev form invalid', function () {
    component.nextForm(component.applicantsFormGroup);
    expect(component.step).toEqual(0);
  });

  it ('should select invalid form control', function () {
    component.validateAllFormFields(component.gradeFormGroup);
    expect(component.gradeFormGroup.get('grade').touched).toEqual(true);
  });

  it ('should set first form group', function () {
    component.fillFormAgain();
    expect(component.step).toEqual(0);
    expect(component.currentFormGroup).toEqual(component.gradeFormGroup);
  });

  it ('should set one more parent if first parent valid and checked secondParent', function () {
    const event = { stopPropagation: () => {} };
    component.parentFormGroup.patchValue({relationship: 'father', firstName: 'XX', lastName: 'XX', gender: 'male'});
    component.parentFormGroup.get('permanentAddress').patchValue({addressLine: 'XX', city: 'XX', country: 'XX'});
    component.parentFormGroup.get('contact').patchValue({telephone: '+38(753) 935-13-31'});
    component.parentFormGroup.updateValueAndValidity();
    component.addOneMoreParent(event);
    expect(component.isSecondParentShown).toEqual(true);
    expect(component.currentFormGroup).toEqual(component.parentFormGroup2);
  });

  it ('should not set one more parent if first paren invalid and checked secondParent', function () {
    const event = { stopPropagation: () => {} };
    component.addOneMoreParent(event);
    expect(component.isSecondParentShown).toEqual(false);
    expect(component.parentFormGroup.get('firstName').touched).toEqual(true);
  });

  it ('should hide one more parent when unchecked secondParent', function () {
    const event = { stopPropagation: () => {} };
    component.isSecondParentShown = true;
    component.addOneMoreParent(event);
    expect(component.isSecondParentShown).toEqual(false);
    expect(component.currentFormGroup).toEqual(component.parentFormGroup);
  });

  it ('should not submit invalid data', function () {
    component.submit();
    expect(component.parentFormGroup.get('firstName').touched).toEqual(true);
  });

  it ('should submit valid data', function () {
    component.currentFormGroup = component.parentFormGroup;
    component.parentFormGroup.patchValue({relationship: 'father', firstName: 'XX', lastName: 'XX', gender: 'male'});
    component.parentFormGroup.get('permanentAddress').patchValue({addressLine: 'XX', city: 'XX', country: 'XX'});
    component.parentFormGroup.get('contact').patchValue({telephone: '+38(753) 935-13-31'});
    component.parentFormGroup.updateValueAndValidity();
    component.submit();
    expect(component.step).toEqual(3);
    expect(component.currentFormGroup).toEqual(component.gradeFormGroup);
  });

});

@Pipe({name: 'localizator'})
class MockLocalizatorPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}
