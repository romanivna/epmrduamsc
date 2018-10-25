import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServerGetterService } from '../../../../shared/services';
import { urls } from '../../../../shared/constants';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { LocalizatorService } from '../../../../shared/services/localizator/localizator.service';

@Component({
  selector: 'app-create-user',
  templateUrl: 'create-user.template.html',
  styleUrls: ['create-user.styles.scss']
})
export class CreateUserComponent implements OnInit, OnDestroy {
  public savePressed: boolean;
  public questionForConfirmation: any;
  public questionToUpdate: boolean;
  private routeGo = new Subject<boolean>();
  private isClickOutside: boolean;
  private isCancel: boolean;
  public createUserForm: FormGroup;
  public mask: any[] = ['+', '3', '8', ' ', '(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  public firstNameError = {
    value: ''
  };
  public lastNameError = {
    value: ''
  };
  public emailError = {
    value: ''
  };
  public phoneNumberError = {
    value: ''
  };
  public passwordError = {
    value: ''
  };
  public passwordConfirmError = {
    value: ''
  };
  public loginError = {
    value: ''
  };

  public roles = [
    {
      name: 'content manager',
      value: 'ROLE_CONTENT_MANAGER'
    },
    {
      name: 'admin',
      value: 'ROLE_ADMIN'
    }
  ];

  public initialRole = 'ROLE_CONTENT_MANAGER';
  public successMsg: string;
  private subscriptions;
  private currentLang: string;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private serverGetterService: ServerGetterService,
              private localizator: LocalizatorService) {}

  ngOnInit() {
    this.buildForm();
    this.detectChangesOnInputs();
    this.savePressed = false;

    this.subscriptions = this.localizator.currentLocaleObservable().subscribe((lang) => {
      this.currentLang = lang;
      this.detectChangesOnInputs();
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  buildForm() {
    this.createUserForm = this.formBuilder.group({
      'firstName': ['', [
        Validators.required,
        Validators.minLength(2)
      ]
      ],
      'lastName': ['', [
        Validators.required,
        Validators.minLength(2)
      ]
      ],
      'email': ['', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ]
      ],
      'role': 'ROLE_CONTENT_MANAGER',
      'phoneNumber': ['', [
        Validators.required,
        Validators.pattern('^[+38]{3}\\s[(][0-9]{3}[)]\\s[0-9]{3}[-][0-9]{2}[-][0-9]{2}$')
      ]
      ],
      'login': ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
      'password': ['', [
        Validators.required,
        Validators.minLength(5)
      ]
      ],
      'passwordConfirm': ''
    });
  }

  detectChangesOnInputs() {
    const emailControl = this.createUserForm.get('email');
    const passwordControl = this.createUserForm.get('password');
    const firstNameControl = this.createUserForm.get('firstName');
    const lastNameControl = this.createUserForm.get('lastName');
    const phoneNumberControl = this.createUserForm.get('phoneNumber');
    const passwordConfirmControl = this.createUserForm.get('passwordConfirm');
    const loginControl = this.createUserForm.get('login');

    this.showErrorWithDebounce(firstNameControl,
      this.firstNameError,
      'First Name',
      1000);
    this.showErrorWithDebounce(lastNameControl,
      this.lastNameError,
      'Last Name',
      1000);
    this.showErrorWithDebounce(emailControl,
      this.emailError,
      'Email',
      1000);
    this.showErrorWithDebounce(phoneNumberControl,
      this.phoneNumberError,
      'Phone Number',
      1000);
    this.showErrorWithDebounce(passwordControl,
      this.passwordError,
      'Password',
      1000);
    this.showErrorWithDebounce(passwordConfirmControl,
      this.passwordConfirmError,
      'Password confirmation',
      1000);
    this.showErrorWithDebounce(loginControl,
      this.loginError,
      'Login',
      1000);
  }

  showErrorWithDebounce(control, error, inputType, timeout) {
    let timerId: any;
    control.valueChanges.subscribe(() => {
      clearTimeout(timerId);
      error.value = '';
      if (control === this.createUserForm.controls.password) {
        this.passwordConfirmError.value = '';
      }
      timerId = setTimeout(() => {
        if (this.createUserForm.controls.password.dirty &&
            this.createUserForm.controls.passwordConfirm.dirty &&
            this.createUserForm.controls.password.value !==
            this.createUserForm.controls.passwordConfirm.value) {
              this.passwordConfirmError.value = 'Passwords are not equal';
        }
        if (control.invalid) {
          this.setError(error, control.errors, inputType);
        }
      }, timeout);
    });
  };

  setError(error, allErrorTypes, inputType) {
    this.localizator.use(this.currentLang);
    if (allErrorTypes.required) {
      error.value = `${this.localizator.translate(`${inputType}`)} ${this.localizator.translate(`is required`)}`;
      // error.value = `${inputType} is required`;
    } else if (allErrorTypes.pattern) {
      error.value = `${this.localizator.translate(`${inputType}`)} ${this.localizator.translate(`should be correct`)}`;
      // error.value = `${inputType} should be correct`;
    } else if (allErrorTypes.minlength) {
        error.value = `${this.localizator.translate(`${inputType}`)} ` +
                      `${this.localizator.translate('should have more than')} ` +
                      `${allErrorTypes.minlength.requiredLength} ` +
                      `${this.localizator.translate(`symbols`)}`;
        // error.value = `${inputType} should have more than ${allErrorTypes.minlength.requiredLength} symbols`;
    }
  }

  createUser(form) {
    const body = {
      id: 0,
      login: form.login,
      password: form.password,
      email: form.email,
      role: form.role,
      phone: form.phoneNumber,
      firstName: form.firstName,
      lastName: form.lastName
    };
    this.serverGetterService.post(urls.api.prod.register, body, { })
      .subscribe( data => {
          if (data.message) {
            this.successMsg = 'User is created';
            this.savePressed = true;
          } else {
            this.successMsg = 'Such user exists';
          }
        }
      );
  }

  public suggestToCancel(): void {
    this.questionForConfirmation = {
      text: 'confirmationQuestionCancel'
    };
    this.questionToUpdate = false;
  }

  public back() {
    if (!this.changeDetection()) {
      this.router.navigate([ '/admin/user-management' ]);
    } else {
      this.suggestToCancel();
      this.isCancel = true;
      this.router.navigate([ '/admin/user-management' ]);
    }
  }

  public canDeactivate() {
    if (!this.changeDetection()) {
      return true;
    } else {
      this.suggestToCancel();
      this.isClickOutside = true;
      return this.routeGo.asObservable();
    }
  }

  public changeDetection() {
    return Object.keys(this.createUserForm.controls).some( value => {
      return this.createUserForm.controls[value].dirty;
    });
  }

  public decideAboutVoting(answer: boolean): void {
    this.questionForConfirmation = null;
    this.reactOnQuestion(answer);
  }

  private reactOnQuestion(answer) {
    if (answer && this.isCancel) {
      return this.routeGo.next(true);
    } else if (answer) {
      return this.routeGo.next(true);
    } else if (!answer && this.isClickOutside) {
      return this.routeGo.next(false);
    }

  }
}
