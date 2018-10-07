import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

import { first } from 'rxjs/operators';

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
