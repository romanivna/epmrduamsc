import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Headers, Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/services';
import {urls} from "../../shared/constants/index";

@Component({
  selector: 'app-login',
  templateUrl: 'login.template.html',
  styleUrls: ['login.styles.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errMessage: string;
  public loginError = {
    value: ''
  };
  public passwordError = {
    value: ''
  };

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private http: Http) { }

  ngOnInit(): void {
    this.buildForm();
    this.detectChangesOnInputs();
  }

  buildForm(): void {
    this.loginForm = this.formBuilder.group({
      'login': ['', Validators.required ],
      'password': ['', [
        Validators.required,
        Validators.minLength(5)
      ]
      ]
    });
  }

  detectChangesOnInputs() {
    const loginControl = this.loginForm.get('login');
    const passwordControl = this.loginForm.get('password');

    this.showErrorWithDebounce(loginControl,
      this.loginError,
      'Login',
      1000);
    this.showErrorWithDebounce(passwordControl,
      this.passwordError,
      'Password',
      1000);
  }

  showErrorWithDebounce(control, error, inputType, timeout) {
    let timerId: any;
    control.valueChanges.subscribe(() => {
      clearTimeout(timerId);
      error.value = '';
      if (control.invalid) {
        timerId = setTimeout(() => {
          this.setError(error, control.errors, inputType);
        }, timeout);
      }
    });
  };

  setError(error, allErrorTypes, inputType) {
    if (allErrorTypes.required) {
      error.value = `${inputType} is required`;
    } else if (allErrorTypes.pattern) {
      error.value = `${inputType} should be correct`;
    } else if (allErrorTypes.minlength) {
      error.value = `${inputType} should have more than ${allErrorTypes.minlength.requiredLength} symbols`;
    }
  }

  login(loginForm) {
    const body = {
      username: loginForm.login,
      password: loginForm.password
    };
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.http.post(urls.api.prod.adminLogin, body, headers)
      .map((res: Response) => {
        return res.headers;
      })
      .subscribe({
        next: (_headers) => {
          const role = _headers.get('UserRole');
          const [ , token ] = _headers.get('Authorization').split(' ');
          this.authService.login(role, token, body.username);
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          this.errMessage = 'invalidCredentials';
          console.error(error);
        }
      });
  }
}
