import { Component, OnInit } from '@angular/core';
import { Workout } from '../_models/workout.model';
import { WorkoutService } from '../_services/workout.service';
import { ActivatedRoute } from '@angular/router';
import { Excercise } from '../_models/excercise.model';

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.component.html',
  styleUrls: ['./workout-detail.component.scss'],
})
export class WorkoutDetailComponent implements OnInit {
  workout: Workout;
  excercises: Excercise[];

  constructor(
    private workoutService: WorkoutService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe(routeParams => {
      this.loadWorkoutDetail(routeParams.id);
    });
  }

  loadWorkoutDetail(id: number) {
    this.workoutService.findById(id).subscribe(workout => {
      this.workout = workout;
      this.excercises = workout.excercises;
    });
  }
}
