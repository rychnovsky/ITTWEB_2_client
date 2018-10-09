import { Component, OnInit } from '@angular/core';
import { Workout } from '../_models/workout.model';
import { WorkoutService } from '../_services/workout.service';
import { AuthenticationService } from '../_services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Excercise } from '../_models/excercise.model';

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.component.html',
  styleUrls: ['./workout-detail.component.scss'],
})
export class WorkoutDetailComponent implements OnInit {
  workout: Workout;
  isLoggedIn: boolean = false;
  excercises: Excercise[];
  loading: boolean;
  redirecturl: string;

  constructor(
    private workoutService: WorkoutService,
    private authService: AuthenticationService,
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.loading = true;
    this.activeRoute.params.subscribe(routeParams => {
      this.loadWorkoutDetail(routeParams.id);
    });
    this.redirecturl = this.router.url;
  }

  loadWorkoutDetail(id: number) {
    this.workoutService.findById(id).subscribe(workout => {
      this.workout = workout;
      this.excercises = workout.excercises;
      this.loading = false;
    });
  }

  /**
   * To be passed to child form
   * @param excercise New excercise to be shown in list
   */
  insertExcercise(excercise: Excercise) {
    console.log(excercise);
    this.excercises.push(excercise);
  }
}
