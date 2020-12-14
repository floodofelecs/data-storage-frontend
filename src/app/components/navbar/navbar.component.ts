import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // Inject router so we can access the url parameter
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // Checks if a provided route is the active one.
  isActiveRoute(route: string): boolean {
    return this.router.url == route;
  }

}
