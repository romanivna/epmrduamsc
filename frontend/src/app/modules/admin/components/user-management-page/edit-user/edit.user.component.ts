import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../shared/declarations';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userRoles } from '../../../../../shared/constants';
import { Location } from '@angular/common';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  public editUserForm: FormGroup;
  public roles = userRoles;
  public currentUser: User;
  public message: string;
  public questionForConfirmation: any;
  public questionToSave: boolean;

  private routeGo = new Subject<boolean>();
  private isClickOutside: boolean;

  constructor(private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder,
              private _location: Location) { }

  ngOnInit() {
    this.currentUser = this.userService.getEditedUser;
    if (!this.currentUser) {
      this.router.navigate(['/admin/user-management']);
    } else {
      this.buildForm();
      this.detectChangesOnInputs();
    }
  }

  private buildForm() {
    this.editUserForm = this.formBuilder.group({
      firstName: [ this.currentUser.firstName , [
        Validators.required,
        Validators.minLength(2)
      ]],
      lastName: [this.currentUser.lastName, [
        Validators.required,
        Validators.minLength(2)
      ]],
      email: [this.currentUser.email, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ]],
      phone: [this.currentUser.phone, [
        Validators.required,
        Validators.pattern('^[0-9]{12}$')
      ]],
      role: this.currentUser.role,
      password: [ '', [
        Validators.required,
        Validators.minLength(5)
      ]],
      passwordConfirm: [ '', [
        Validators.required,
        Validators.minLength(5)
      ]],
    });
  }
  public back() {
    if (this.changeDetection()) {
      this.router.navigate([ '/admin/user-management' ]);
    } else {
      this.canDeactivate();
    }
  }

  public changeDetection() {
    if (this.editUserForm !== undefined) {
      const emailControl = this.editUserForm.controls.email.value === this.currentUser.email;
      const firstNameControl = this.editUserForm.controls.firstName.value === this.currentUser.firstName;
      const lastNameControl = this.editUserForm.controls.lastName.value === this.currentUser.lastName;
      const phoneControl = this.editUserForm.controls.phone.value === this.currentUser.phone;
      if (emailControl && firstNameControl && lastNameControl && phoneControl) {
        return true;
      } else {
        return false;
      }
    }
  }
  public canDeactivate() {
    if (this.changeDetection()) {
      return true;
    } else {
      this.isClickOutside = true;
      this.questionForConfirmation = {
        text: 'confirmationQuestionCancel'
      };
      this.questionToSave = false;
      return this.routeGo.asObservable();
    }
  }

  public decideAboutVoting(answer) {
    this.questionForConfirmation = null;
    if (this.questionToSave && answer) {
      this.editUser(this.editUserForm);
    } else if (answer && !this.isClickOutside) {
      this.router.navigate(['/admin/user-management']);
    } else if (answer && this.isClickOutside) {
      return this.routeGo.next(true);
    } else if (!answer && this.isClickOutside) {
      return this.routeGo.next(false);
    }
  }

  public editUser(form) {
    const user: User = {
      firstName: form.firstName,
      login: form.login,
      lastName: form.lastName,
      phone: form.phone,
      email: form.email,
      role: form.role,
      id:  this.currentUser.id,
      password: form.password,
    };
    this.saveUser(user);
  }

  public flushMessage() {
    this.message = null;
  }

  public cancelEditing() {
    this.questionForConfirmation = {
      text: 'confirmationQuestionCancel'
    };
    this.questionToSave = false;
    this.userService.editUser(null);
  }

  private saveUser(user: User) {
    this.userService.saveUser(user).subscribe({
      next: (res) => {
        this.userService.editUser(null);
        this.message = 'User saved';
      },
      error: (err) => {
        this.message = 'Oops something went wrong';
      }
    });
  }

  setError(allErrorTypes, inputType) {
    if (allErrorTypes.required) {
      this.message = `${inputType} is required`;
    } else if (allErrorTypes.pattern) {
      this.message = `${inputType} should be correct`;
    } else if (allErrorTypes.minlength) {
      this.message = `${inputType} should have more than ${allErrorTypes.minlength.requiredLength} symbols`;
    }
  }

  detectChangesOnInputs() {
    const emailControl = this.editUserForm.get('email');
    const firstNameControl = this.editUserForm.get('firstName');
    const lastNameControl = this.editUserForm.get('lastName');
    const phoneControl = this.editUserForm.get('phone');
    const passwordControl = this.editUserForm.get('password');
    const passwordControlConfirm = this.editUserForm.get('passwordConfirm');

    this.showErrorWithDebounce(firstNameControl,
      'First Name',
      1000);
    this.showErrorWithDebounce(lastNameControl,
      'Last Name',
      1000);
    this.showErrorWithDebounce(emailControl,
      'Email',
      1000);
    this.showErrorWithDebounce(phoneControl,
      'Phone Number',
      1000);
    this.showErrorWithDebounce(passwordControl,
      'Password',
      1000);
    this.showErrorWithDebounce(passwordControlConfirm,
      'Password confirmation',
      1000);
  }


  showErrorWithDebounce(control, inputType, timeout) {
    let timerId: any;
    control.valueChanges.subscribe(() => {
      clearTimeout(timerId);
      this.message = null;
      if (control === this.editUserForm.controls.password) {
        this.message = '';
      }
      timerId = setTimeout(() => {
        if (this.editUserForm.controls.password.dirty &&
          this.editUserForm.controls.passwordConfirm.dirty &&
          this.editUserForm.controls.password.value !==
          this.editUserForm.controls.passwordConfirm.value) {
          this.message = 'Passwords are not equal';
        }
        if (control.invalid) {
          this.setError(control.errors, inputType);
        }
      }, timeout);
    });
  };
}


