import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Get the authentication token we need for the backend.
    const authToken = this.authService.getAuthToken();
    if (authToken == '') {
      // Do not edit request
      return next.handle(request);
    }
    // Clone the request and add our authentication header
    const authenticatedReq = request.clone({
      headers: request.headers.set('Authorization', `Token ${authToken}`)
    })
    return next.handle(authenticatedReq);
  }
}
