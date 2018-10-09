import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workout } from '../_models/workout.model';
import { DaoService } from './dao.service';
import { Observable } from 'rxjs';
import { Excercise } from '../_models/excercise.model';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService extends DaoService<Workout> {
  resourceEndpoint: string;

  constructor(http: HttpClient) {
    super(http, 'workouts');
    this.resourceEndpoint = 'workouts';
  }

  addNewExcerise(
    workoutId: number,
    newExcercise: Excercise,
  ): Observable<Workout> {
    return this.http.post<Workout>(
      `${this.apiBaseUrl}/${this.resourceEndpoint}/${workoutId}`,
      newExcercise,
    );
  }
}
