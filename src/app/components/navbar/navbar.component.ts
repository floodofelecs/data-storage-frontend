import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // Inject router so we can access the url parameter
  constructor(private router: Router,
    private authService: AuthenticationService) { }

  loggedIn: boolean = false;

  ngOnInit(): void {
    // Check if user is logged in, if the are we should show login button
    this.loggedIn = this.authService.isAuthenticated();
  }

  /**
   *  Logs a user out
   */
  logout() {
    // Logs a user out, and sends them back to login page with the router.navigate call
    this.authService.logout().subscribe(res => this.router.navigate(['/']))
  }

  // Checks if a provided route is the active one.
  isActiveRoute(route: string): boolean {
    return this.router.url == route;
  }

}
