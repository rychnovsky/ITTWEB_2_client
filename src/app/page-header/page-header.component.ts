import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../_models/user.model';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  subtitle: string;

  isLoggedIn: boolean;
  currentUser: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUser = this.authService.getCurrentUser().getFullName();
  }

  logOut() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
    return false;
  }
}
