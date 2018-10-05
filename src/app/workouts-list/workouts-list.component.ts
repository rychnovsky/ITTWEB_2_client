import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../services/workout.service';
import { Workout } from '../model/workout.model';

@Component({
  selector: 'app-workouts-list',
  templateUrl: './workouts-list.component.html',
  styleUrls: ['./workouts-list.component.scss'],
})
export class WorkoutsListComponent implements OnInit {
  public workouts: Workout[];

  constructor(workoutService: WorkoutService) {
    workoutService
      .getWorkouts()
      .subscribe(workouts => (this.workouts = workouts));
  }

  ngOnInit() {}
}
