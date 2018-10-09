import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../_services/workout.service';
import { Workout } from '../_models/workout.model';

@Component({
  selector: 'app-workouts-list',
  templateUrl: './workouts-list.component.html',
  styleUrls: ['./workouts-list.component.scss'],
})
export class WorkoutsListComponent implements OnInit {
  loading: boolean;
  workouts: Workout[];

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.loading = true;
    this.loadWorkoutsList();
  }

  loadWorkoutsList() {
    this.workoutService.findAll().subscribe(workouts => {
      this.workouts = workouts;
      this.loading = false;
    });
  }
}
