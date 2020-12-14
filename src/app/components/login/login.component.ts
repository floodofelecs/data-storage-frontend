import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service'
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder) { }

  // Form tracking login inputs
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  error = false;


  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      // Redirect the user to sensor data page
      this.router.navigate(['/sensordata'])
    }
  }

  /**
   * Submits the filled in login form. Assumes form is valid.
   */
  submitLoginForm() {
    // Submit the login credentials to backend.
    this.authService.authenticate(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value)
    .pipe(catchError(err => {
      // Set the error flag to true so user gets feedback
      this.error = true;
      return throwError("Auth failed")
    }))
    .subscribe(response => {
      this.error = false;
      console.log("Successful login!");
      // Redirect user to sensor data page
      this.router.navigate(['/sensordata']);
    })
  }
}
