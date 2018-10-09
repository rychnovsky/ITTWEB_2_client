import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workout } from '../_models/workout.model';
import { DaoService } from './dao.service';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService extends DaoService<Workout> {
  constructor(http: HttpClient) {
    super(http, 'workouts');
  }
}
