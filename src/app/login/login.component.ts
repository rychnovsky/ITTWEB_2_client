import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
export class LoginComponent {
  email: string;
  password: string;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private alertService: AlertService,
  ) {}

  onSubmit() {
    console.log('submited');
    let user: User = new User();
    user.email = this.email;
    user.password = this.password;

    console.log(user);

    this.authService
      .login(user)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.router.navigateByUrl('/');
        },
        (err: HttpErrorResponse) => {
          console.log(
            `Backend returned code ${err.status}, body was: `,
            err.error,
          );

          // this.hasError = true;
          this.alertService.error(err.error.message);

          return false;
        },
      );
    return false;
  }
}
