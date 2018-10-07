import { Injectable } from '@angular/core';
import { User } from '../_models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

import config from '../_config/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  apiBaseUrl: string = config.API_BASE_URL;

  constructor(private http: HttpClient) {}

  private saveToken(token: string) {
    window.localStorage['loc8r-token'] = token;
  }
  private getToken() {
    if (window.localStorage['loc8r-token']) {
      return window.localStorage['loc8r-token'];
    } else {
      return '';
    }
  }

  public currentUser(): User {
    if (this.isLoggedIn()) {
      const token = this.getToken();
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      const user = new User();
      user.email = payload.email;
      user.surName = payload.name;
      return user;
    } else {
      return;
    }
  }

  public isLoggedIn() {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public login(user: User) {
    const url = `${this.apiBaseUrl}/login`;
    this.http.post<User>(url, user).subscribe(
      data => {
        this.saveToken(data.token);
        return true;
      },
      // Errors will call this callback instead:
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
  }

  public register(user: User): Observable<User> {
    const url = `${this.apiBaseUrl}/register`;
    return this.http.post<User>(url, user).pipe(
      map(
        data => {
          this.saveToken(data.token);
          return data;
        },
        // Errors will call this callback instead:
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
      ),
    );
  }
}
