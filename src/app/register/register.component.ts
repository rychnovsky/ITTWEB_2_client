import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

import { first } from 'rxjs/operators';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @ViewChild('f')
  form: any;

  user: User = new User();

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private alertService: AlertService,
  ) {}

  onSubmit() {
    console.log(this.user);

    if (this.form.invalid) {
      if (this.form.controls.email.errors.email) {
        this.alertService.error('Email has bad format!');
        return;
      }
      this.alertService.error('Fill all the fields in this form!');
      return;
    }

    this.authService
      .register(this.user)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.alertService.success('You have successfully registered!', true);
          this.router.navigate(['/']);
        },
        (err: HttpErrorResponse) => {
          console.log(
            `Backend returned code ${err.status}, body was: ${err.error}`,
          );

          this.alertService.error(err.error.message);

          return false;
        },
      );

    return false;
  }
}
