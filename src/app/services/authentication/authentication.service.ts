import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Configuration } from '../../../config'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private http: HttpClient, private cookieService: CookieService) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  /**
   * Authenticates user with backend using a username and password
   * @param username Username to sign in with
   * @param password Password to sign in with
   */
  authenticate(username: string, password: string) {
    return this.http.post(`${Configuration.auth_url}/login/`, { username: username, password: password })
      .pipe(catchError(this.handleError))
      .pipe(map(res => {
        // Here, we know we authenticated successfully. Set a cookie so frontend knows this.
        this.cookieService.set('authenticated', 'true');
        return res; // Don't modify response
      }))
  }

  isAuthenticated() {
    return this.cookieService.get('authenticated') == 'true';
  }

  /**
   * Logs a user out
   */
  logout() {
    return this.http.get(`${Configuration.auth_url}/logout/`)
      .pipe(map(res => {
        // We know user just logged out. Remove cookie.
        this.cookieService.delete('authenticated');
        return res;
      })).pipe(catchError(this.handleError))
  }
}
