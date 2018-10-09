import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../_services/workout.service';
import { Workout } from '../_models/workout.model';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-workouts-list',
  templateUrl: './workouts-list.component.html',
  styleUrls: ['./workouts-list.component.scss'],
})
export class WorkoutsListComponent implements OnInit {
  loading: boolean;
  currentUser: string;
  workouts: Workout[];

  constructor(
    private workoutService: WorkoutService,
    private authService: AuthenticationService,
  ) {}

  ngOnInit() {
    this.loading = true;
    this.currentUser = this.authService.getCurrentUser().firstName;
    this.loadWorkoutsList();
  }

  loadWorkoutsList() {
    this.workoutService.findAll().subscribe(workouts => {
      this.workouts = workouts;
      this.loading = false;
    });
  }

  insertWorkout(workout: Workout) {
    this.workouts.push(workout);
  }
}
