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

  public getToken() {
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

  public login(user: User): Observable<User> {
    const url = `${this.apiBaseUrl}/login`;
    return this.http.post<User>(url, user).pipe(
      map(data => {
        this.saveToken(data.token);
        return data;
      }),
    );
  }

  public register(user: User): Observable<User> {
    const url = `${this.apiBaseUrl}/register`;
    return this.http.post<User>(url, user).pipe(
      map(data => {
        this.saveToken(data.token);
        return data;
      }),
    );
  }
}
