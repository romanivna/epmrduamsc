import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { applicantsFormFields, applicantsGradeFormFielder, parentFormFields } from './constants';
import { urls } from '../../shared/constants/index';
import { ServerGetterService } from '../../shared/services/index';
import { FileUploadService } from '../../shared/services/index';
import * as moment from 'moment';


@Component({
  selector: 'app-admissions',
  templateUrl: './admissions.component.html',
  styleUrls: ['./admissions.component.scss']
})
export class AdmissionsComponent implements OnInit {
  isSecondParentShown = false;
  step = 0;
  submitResponse = null;

  patternName = /^[A-Za-zА-Яа-яЁёІЇЄҐіїєґ][A-Za-zА-Яа-яЁёІЇЄҐіїєґ\-\'\s]*$/;
  patternBirth = /^(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).(19[0-9]{2}|20[0-9]{2})$/;
  patternAddressLine = /[A-Za-zА-Яа-яЁёІЇЄҐіїєґ.,_/\-\s\d]$/;
  patternAddressCity = /^[A-Za-zА-Яа-яЁёІЇЄҐіїєґ][A-Za-zА-Яа-яЁёІЇЄҐіїєґ\-\'\s\d]*$/;
  patternAddressCountry = /^[A-Za-zА-Яа-яЁёІЇЄҐіїєґ][A-Za-zА-Яа-яЁёІЇЄҐіїєґ\-\'\s]*$/;
  patternAddressPostal = /[A-Za-z._\-\s\d]*$/;
  patternTel = /^(\+[3][8])\((\d){3}\) (\d){3}\-(\d){2}\-(\d){2}$/;
  patternEmail = /.+@.+\..+/i;

  public applicantsGradeForm: any[];
  public applicantsFormFields: any[];
  public parentFormFields: any[];
  public files: any[] = [];

  gradeFormGroup = new FormGroup({
    grade: new FormControl('')
  });

  applicantsFormGroup = new FormGroup({
    department: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern(this.patternName),
      Validators.minLength(2),
      Validators.maxLength(40)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern(this.patternName),
      Validators.minLength(2),
      Validators.maxLength(40)
    ]),
    middleName: new FormControl('', [
      Validators.pattern(this.patternName),
      Validators.maxLength(40)
    ]),
    birthday: new FormControl('', [
      this.validateBirthdayForGrade.bind(this),
      Validators.required,
      Validators.pattern(this.patternBirth)
    ]),
    gender: new FormControl('', [Validators.required]),
    permanentAddress: new FormGroup({
      addressLine: new FormControl('', [
        Validators.required,
        Validators.pattern(this.patternAddressLine),
        Validators.minLength(2),
        Validators.maxLength(40)
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.pattern(this.patternAddressCity),
        Validators.minLength(2),
        Validators.maxLength(40)
      ]),
      region: new FormControl('', [
        Validators.pattern(this.patternAddressCity),
        Validators.minLength(2),
        Validators.maxLength(64)
      ]),
      country: new FormControl('', [
        Validators.required,
        Validators.pattern(this.patternAddressCountry),
        Validators.minLength(2),
        Validators.maxLength(40)
      ]),
      postal: new FormControl('', [
        Validators.pattern(this.patternAddressPostal),
        Validators.minLength(2),
        Validators.maxLength(15)
      ])
    }),
    contact: new FormGroup({
      telephone: new FormControl('', [
        Validators.pattern(this.patternTel),
        Validators.minLength(15),
        Validators.maxLength(20)
      ]),
      email: new FormControl('', [
        Validators.pattern(this.patternEmail)
      ])
    }),
    dormitory: new FormControl('', [Validators.required])
  });

  parentFormGroup = new FormGroup({
    relationship: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern(this.patternName),
      Validators.minLength(2),
      Validators.maxLength(40)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern(this.patternName),
      Validators.minLength(2),
      Validators.maxLength(40)
    ]),
    middleName: new FormControl('', [
      Validators.pattern(this.patternName),
      Validators.minLength(2),
      Validators.maxLength(40)
    ]),
    birthday: new FormControl('', [
      Validators.pattern(this.patternBirth),
    ]),
    gender: new FormControl('', [Validators.required]),
    permanentAddress: new FormGroup({
      addressLine: new FormControl('', [
        Validators.required,
        Validators.pattern(this.patternAddressLine),
        Validators.minLength(2),
        Validators.maxLength(40)
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.pattern(this.patternAddressCity),
        Validators.minLength(2),
        Validators.maxLength(40)
      ]),
      region: new FormControl('', [
        Validators.pattern(this.patternAddressCity),
        Validators.minLength(2),
        Validators.maxLength(64)
      ]),
      country: new FormControl('', [
        Validators.required,
        Validators.pattern(this.patternAddressCountry),
        Validators.minLength(2),
        Validators.maxLength(40)
      ]),
      postal: new FormControl('', [
        Validators.pattern(this.patternAddressPostal),
        Validators.minLength(2),
        Validators.maxLength(15)
      ])
    }),
    contact: new FormGroup({
      telephone: new FormControl('', [
        Validators.required,
        Validators.pattern(this.patternTel),
        Validators.minLength(15),
        Validators.maxLength(20)
      ]),
      email: new FormControl('', [
        Validators.pattern(this.patternEmail)
      ])
    })
  });

  parentFormGroup2 = new FormGroup({
    relationship: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern(this.patternName),
      Validators.minLength(2),
      Validators.maxLength(40)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern(this.patternName),
      Validators.minLength(2),
      Validators.maxLength(40)
    ]),
    middleName: new FormControl('', [
      Validators.pattern(this.patternName),
      Validators.minLength(2),
      Validators.maxLength(40)
    ]),
    birthday: new FormControl('', [
      Validators.pattern(this.patternBirth),
    ]),
    gender: new FormControl('', [Validators.required]),
    permanentAddress: new FormGroup({
      addressLine: new FormControl('', [
        Validators.required,
        Validators.pattern(this.patternAddressLine),
        Validators.minLength(2),
        Validators.maxLength(40)
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.pattern(this.patternAddressCity),
        Validators.minLength(2),
        Validators.maxLength(40)
      ]),
      region: new FormControl('', [
        Validators.pattern(this.patternAddressCity),
        Validators.minLength(2),
        Validators.maxLength(64)
      ]),
      country: new FormControl('', [
        Validators.required,
        Validators.pattern(this.patternAddressCountry),
        Validators.minLength(2),
        Validators.maxLength(40)
      ]),
      postal: new FormControl('', [
        Validators.pattern(this.patternAddressPostal),
        Validators.minLength(2),
        Validators.maxLength(15)
      ])
    }),
    contact: new FormGroup({
      telephone: new FormControl('', [
        Validators.required,
        Validators.pattern(this.patternTel),
        Validators.minLength(15),
        Validators.maxLength(20)
      ]),
      email: new FormControl('', [
        Validators.pattern(this.patternEmail),
      ])
    })
  });

  currentFormGroup: any = this.gradeFormGroup;


  private static preparePersonDTO(formGroup: FormGroup) {
    const {contact, birthday, ...personInfo} = formGroup.value;
    contact.email = contact.email.toLowerCase();
    const result = {
      id: 0,
      ...contact,
      ...personInfo,
      permanentAddress: {
        id: 0,
        ...personInfo.permanentAddress
      },
    };

    if (birthday) {
      result.birthday = moment.utc(birthday, 'DD.MM.YYYY').valueOf();
    }
    return result;
  }

  constructor(private serverGetterService: ServerGetterService,
              private fileUploadService: FileUploadService) {
  }

  validateBirthdayForGrade(c: AbstractControl): { [key: string]: boolean } | null {
    const dateNow: number = Date.now();
    const birthDate: Date = new Date();
    const birthMatchResult: string[] = c.value && c.value.match(this.patternBirth);
    if (!birthMatchResult) {
      return null;
    }
    const studentBirthdayYear = parseInt(birthMatchResult[3], 10);
    const studentBirthdayMonth = parseInt(birthMatchResult[2], 10);
    const studentBirthdayDay = parseInt(birthMatchResult[1], 10);
    birthDate.setFullYear(studentBirthdayYear, studentBirthdayMonth, studentBirthdayDay);
    const birthDateMillisec = birthDate.getTime();
    const ageInMillisec = dateNow - birthDateMillisec;
    const age = ageInMillisec / 365 / 24 / 60 / 60 / 1000;
    const gradeValue = this.gradeFormGroup.get('grade').value;
    if (gradeValue === 'Grade 1' && (age < 4 || age > 8)) {
      return {
        'invalidAgeForGrade1': true
      };
    }
    if (gradeValue === 'Grade 2-9' && (age < 6 || age > 17)) {
      return {
        'invalidAgeForGrade29': true
      };
    }
    return null;
  }

  ngOnInit() {
    this.serverGetterService.get(urls.api.prod.departments).subscribe(data => {
      this.applicantsGradeForm = applicantsGradeFormFielder;
      this.parentFormFields = parentFormFields;
      this.applicantsFormFields = applicantsFormFields;
      this.applicantsFormFields[0].options = data['data'];
    });
  }

  nextForm(formGroup: FormGroup) {
    if (this.currentFormGroup.valid) {
      this.currentFormGroup = formGroup;
      if (this.currentFormGroup === this.parentFormGroup && this.isSecondParentShown) {
        this.currentFormGroup = this.parentFormGroup2;
      }
      this.step++;
      this.copyStudentAddressToParent();
      window.scrollTo(0, 0);
    } else {
      this.validateAllFormFields(this.currentFormGroup);
      const invalidFields = document.querySelector('input.ng-invalid,select.ng-invalid');
      invalidFields.scrollIntoView();
    }
  }

  prevForm(formGroup: FormGroup) {
    window.scrollTo(0, 0);
    this.currentFormGroup = formGroup;
    this.step--;
  }

  copyStudentAddressToParent() {
    const fieldsToCopy = [
      'addressLine',
      'city',
      'region',
      'country',
      'postal'
    ];
    fieldsToCopy.forEach(field => {
      const studentAddressValue = this.applicantsFormGroup.get('permanentAddress').get(field).value;
      this.parentFormGroup.get('permanentAddress').get(field).setValue(studentAddressValue);
      this.parentFormGroup2.get('permanentAddress').get(field).setValue(studentAddressValue);
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(control => {
      const field = formGroup.get(control);

      if ((field as FormGroup).controls) {
        this.validateAllFormFields(field as FormGroup);
      } else if (field as FormControl) {
        (field as FormControl).markAsTouched({onlySelf: true});
      }
    });
  }

  addOneMoreParent(event) {
    if (!this.isSecondParentShown) {
      if (this.parentFormGroup.valid) {
        this.currentFormGroup = this.parentFormGroup2;
        this.isSecondParentShown = true;
      } else {
        this.isSecondParentShown = false;
        this.validateAllFormFields(this.parentFormGroup);
        event.stopPropagation();
        const invalidFields = document.getElementsByClassName('ng-invalid');
        invalidFields[0].scrollIntoView();
        return false;
      }
    } else {
      this.currentFormGroup = this.parentFormGroup;
      this.isSecondParentShown = false;
    }
  }

  submit() {
    if (this.parentFormGroup.valid && this.currentFormGroup.valid) {
      this.serverGetterService.post(`${urls.api.prod.applicants}/submit`, this.constructForm(), {})
        .subscribe(
          resp => {
            this.submitResponse = resp.message;
          },
          error => {
            this.submitResponse = (typeof error === 'string' ? error.slice(0, 3) : true);
          }
        );
      this.gradeFormGroup.reset();
      this.applicantsFormGroup.reset({middleName: '', contact: {telephone: '', email: ''}, permanentAddress: {postal: '', region: ''}});
      this.parentFormGroup.reset({middleName: '', contact: {telephone: '', email: ''},  permanentAddress: {postal: '', region: ''}});
      this.parentFormGroup2.reset({middleName: '', contact: {telephone: '', email: ''},  permanentAddress: {postal: '', region: ''}});
      this.step = 3;
      this.currentFormGroup = this.gradeFormGroup;
      this.files = [];
      this.isSecondParentShown = false;
      window.scrollTo(0, 0);
    } else {
      this.validateAllFormFields(this.parentFormGroup);
      this.validateAllFormFields(this.currentFormGroup);
      const invalidFields = document.querySelector('input.ng-invalid,select.ng-invalid');
      invalidFields.scrollIntoView();
    }
  }

  fillFormAgain() {
    this.step = 0;
    this.currentFormGroup = this.gradeFormGroup;
    window.scrollTo(0, 0);
  }

  constructForm() {
    const studentDTO = AdmissionsComponent.preparePersonDTO(this.applicantsFormGroup);
    studentDTO.department = this.applicantsFormFields[0].options.filter(item => {
      return item.name === studentDTO.department;
    })[0];
    if (studentDTO.dormitory === 'yes') {
      studentDTO.dormitory = true;
    } else {
      studentDTO.dormitory = false;
    }
    const parent = [AdmissionsComponent.preparePersonDTO(this.parentFormGroup)];
    if (this.isSecondParentShown) {
      parent.push(AdmissionsComponent.preparePersonDTO(this.parentFormGroup2));
    }
    const grade = this.gradeFormGroup.get('grade').value.split(' ')[1];
    const form = {
      id: 0,
      grade: grade,
      student: studentDTO,
      date: '10-10-2018',
      deleted: 'false',
      parent
    };
    return form;
  }

  onUpload(event: any) {
    this.fileUploadService.upload(event, this.files);
  }

}
