import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthenticationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token: string = this.auth.getToken();
    if (token) {
      // Get the token from the service.
      const authHeader = 'Bearer ' + token;
      // Clone the request to add the new header.
      const authReq = req.clone({ setHeaders: { Authorization: authHeader } });
      // Pass on the cloned request instead of the original request.
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
