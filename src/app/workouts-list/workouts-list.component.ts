import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../_services/workout.service';
import { Workout } from '../_models/workout.model';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user.model';

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

  constructor(
    private workoutService: WorkoutService,
    private authService: AuthenticationService,
  ) {}

  ngOnInit() {
    this.loading = true;
    this.isLoggedIn = this.authService.isLoggedIn();
    const currentUser: User = this.authService.getCurrentUser();
    this.currentUserName = currentUser ? currentUser.firstName : '';
    this.loadWorkoutsList();
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
