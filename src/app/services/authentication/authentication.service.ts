import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Configuration } from '../../../config'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // Tracks authentication status of user
  public isAuthenticated = new BehaviorSubject(false);

  constructor(private http: HttpClient, private cookieService: CookieService) { 
    // Update the isAuthenticated property using cookie, and subscribe to it so we can change the cookie value later.
    this.isAuthenticated.next(this.cookieService.get('authenticated') == 'true');
    this.isAuthenticated.subscribe(authStatus => this.cookieService.set('authenticated', authStatus.toString()));
  }


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
  authenticate(username: string, password: string): Observable<any> {
    return this.http.post(`${Configuration.auth_url}/login/`, { username: username, password: password })
      .pipe(catchError(this.handleError))
      .pipe(map((res:any) => {
        // Here, we know we authenticated successfully. Set the isAuthenticated property so frontend knows this.
        this.isAuthenticated.next(true);
        this.cookieService.set('token', res.token);
        return res; // Don't modify response
      }))
  }

  getAuthToken() {
    return this.cookieService.get('token') || ''; // provide default value
  }

  /**
   * Logs a user out
   */
  logout() {
    return this.http.get(`${Configuration.auth_url}/logout/`)
      .pipe(map(res => {
        // We know user just logged out. Remove cookie.
        this.isAuthenticated.next(false);
        this.cookieService.delete('token');
        return res;
      }),
      catchError(err => {
        // Even if we had an error, log the user out.
        this.isAuthenticated.next(false);
        this.cookieService.delete('token');
        return this.handleError(err);
      }))
  }
}
