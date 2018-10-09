import { Component, OnInit } from '@angular/core';
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
  firstname: string;
  surname: string;
  password: string;
  email: string;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private alertService: AlertService,
  ) {}

  onSubmit() {
    console.log('submited');
    let user: User = new User();
    user.firstName = this.firstname;
    user.surName = this.surname;
    user.password = this.password;
    user.email = this.email;

    console.log(user);

    this.authService
      .register(user)
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
