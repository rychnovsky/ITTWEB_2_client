import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../_services/workout.service';
import { Workout } from '../_models/workout.model';

@Component({
  selector: 'app-workouts-list',
  templateUrl: './workouts-list.component.html',
  styleUrls: ['./workouts-list.component.scss'],
})
export class WorkoutsListComponent implements OnInit {
  public workouts: Workout[];

  constructor(workoutService: WorkoutService) {
    workoutService.findAll().subscribe(workouts => (this.workouts = workouts));
  }

  ngOnInit() {}
}
