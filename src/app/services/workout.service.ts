import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workout } from '../model/workout.model';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  url = 'http://ittweb-2.herokuapp.com/api/workouts';

  constructor(private http: HttpClient) {}

  getWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(this.url);
  }
}
