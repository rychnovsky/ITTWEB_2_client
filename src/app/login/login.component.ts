import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models/user.model';
import { AuthenticationService } from '../_services/authentication.service';

import { first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

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
          debugger;
          this.router.navigate(['/']);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong, console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
            console.log(
              `Backend returned code ${err.status}, body was: ${err.error}`,
            );
          }
          return false;
        },
      );

    return false;
  }
}
