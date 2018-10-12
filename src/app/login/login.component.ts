import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_models/user.model';
import { AuthenticationService } from '../_services/authentication.service';

import { first, retry } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('f')
  form: any;

  user: User = new User();

  backurl: string = '/';

  constructor(
    private authService: AuthenticationService,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    if (this.authService.redirectUrl) {
      // set back link to app
      const returnurl: string = this.authService.redirectUrl;
      this.backurl = returnurl === '/workout-log' ? '/' : returnurl;
    }
  }

  onSubmit() {
    debugger;

    console.log(this.user);

    if (this.form.invalid) {
      this.alertService.error('Fill all the fields in this form!');
      return;
    }

    this.authService
      .login(this.user)
      .pipe(first())
      .subscribe();
    return false;
  }
}
