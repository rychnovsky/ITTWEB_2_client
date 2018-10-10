import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Workout } from '../_models/workout.model';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-workout-log',
  templateUrl: './workout-log.component.html',
  styleUrls: ['./workout-log.component.scss'],
})
export class WorkoutLogComponent implements OnInit {
  loading: boolean;
  currentUserName: string;
  workouts: Workout[];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ) {}

  ngOnInit() {
    this.loading = true;
    this.currentUserName = this.authService.getCurrentUser().firstName;
    this.workouts = [];
    this.loading = false;
  }
}
