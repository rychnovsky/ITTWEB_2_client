import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';

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

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  ngOnInit() {}

  logOut() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
    return false;
  }
}
