import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../_models/user.model';
import { AlertService } from '../_services/alert.service';

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
    private alertService: AlertService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUser = this.authService.getCurrentUser().getFullName();
  }

  logOut() {
    this.authService.logout();
    this.alertService.success('You have logged out', true);
    this.router.navigateByUrl('/login');
    return false;
  }
}
