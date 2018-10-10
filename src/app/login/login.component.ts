import { Component, OnInit } from '@angular/core';
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
  email: string = '';
  password: string = '';

  returnurl: string = '/';

  constructor(
    private authService: AuthenticationService,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    if (this.authService.redirectUrl) {
      this.returnurl = this.authService.redirectUrl;
    }
  }

  onSubmit() {
    if (!this.validate()) {
      this.alertService.error('Username or password is missing');
      return;
    }

    let user: User = new User();
    user.email = this.email;
    user.password = this.password;

    this.authService
      .login(user)
      .pipe(first())
      .subscribe();
    return false;
  }

  private validate(): boolean {
    return this.email !== '' && this.password !== '';
  }
}
