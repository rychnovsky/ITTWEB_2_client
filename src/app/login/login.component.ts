import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_models/user.model';
import { AuthenticationService } from '../_services/authentication.service';

import { first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  returnurl: string = '/';

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    if (this.authService.redirectUrl) {
      this.returnurl = this.authService.redirectUrl;
    }
  }

  onSubmit() {
    let user: User = new User();
    user.email = this.email;
    user.password = this.password;

    this.authService
      .login(user)
      .pipe(first())
      .subscribe();
    return false;
  }
}
