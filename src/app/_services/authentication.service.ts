import { Injectable } from '@angular/core';
import { User } from '../_models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, first } from 'rxjs/operators';

import config from '../_config/config';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  apiBaseUrl: string = config.API_BASE_URL;
  CURRENT_USER: string = 'auth-token';
  // store the URL so we can redirect after logging in
  public redirectUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertService,
  ) {}

  private saveToken(token: string) {
    window.localStorage[this.CURRENT_USER] = token;
  }

  public getToken() {
    if (window.localStorage[this.CURRENT_USER]) {
      return window.localStorage[this.CURRENT_USER];
    } else {
      return '';
    }
  }

  public getCurrentUser(): User {
    if (this.isLoggedIn()) {
      const token = this.getToken();
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      const user = new User();
      user.email = payload.email;
      user.firstName = payload.firstName;
      user.surName = payload.surName;
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
    return this.sendLoginRequest(url, user);
  }

  public logout() {
    localStorage.removeItem(this.CURRENT_USER);
  }

  public register(user: User): Observable<User> {
    const url = `${this.apiBaseUrl}/register`;
    return this.sendLoginRequest(url, user);
  }

  private sendLoginRequest(url: string, user: User): Observable<User> {
    return this.http.post<User>(url, user).pipe(
      map(data => {
        console.log(data);
        console.log('d');
        this.saveToken(data.token);
        this.router.navigateByUrl(this.redirectUrl ? this.redirectUrl : '/');
        this.redirectUrl = '';
        return data;
      }),
    );
  }
}
