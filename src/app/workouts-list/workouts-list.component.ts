import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../_services/workout.service';
import { Workout } from '../_models/workout.model';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workouts-list',
  templateUrl: './workouts-list.component.html',
  styleUrls: ['./workouts-list.component.scss'],
})
export class WorkoutsListComponent implements OnInit {
  loading: boolean;
  isLoggedIn: boolean = false;
  currentUserName: string;
  workouts: Workout[];
  redirecturl: string = '';

  constructor(
    private workoutService: WorkoutService,
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loading = true;
    this.isLoggedIn = this.authService.isLoggedIn();
    const currentUser: User = this.authService.getCurrentUser();
    this.currentUserName = currentUser ? currentUser.firstName : '';
    this.loadWorkoutsList();
    this.redirecturl = this.router.url;
  }

  loadWorkoutsList() {
    this.workoutService.findAll().subscribe(workouts => {
      this.workouts = workouts;
      this.loading = false;
    });
  }

  /**
   * To be passed to child form
   * @param workout New workout to be shown in list
   */
  insertWorkout(workout: Workout) {
    this.workouts.push(workout);
  }
}
