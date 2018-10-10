import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
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
  currentUserName: string;

  constructor(
    private authService: AuthenticationService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    const currentUser: User = this.authService.getCurrentUser();
    this.currentUserName = currentUser ? currentUser.getFullName() : '';
  }

  logOut() {
    this.authService.logout();
    this.alertService.success('You have logged out', true);

    let returnUrl: string = this.router.url;
    if (
      this.route.routeConfig.canActivate &&
      this.route.routeConfig.canActivate.length > 0
    ) {
      returnUrl = '/';
    }

    this.authService.redirectUrl = returnUrl;
    this.router.navigate(['login']);
    return false;
  }

  logIn() {
    let returnUrl: string = this.router.url;
    if (
      this.route.routeConfig.canActivate &&
      this.route.routeConfig.canActivate.length > 0
    ) {
      returnUrl = '/';
    }

    this.authService.redirectUrl = returnUrl;
    this.router.navigate(['login']);
    return false;
  }
}
