import { Injectable } from '@angular/core';
import { DaoService } from './dao.service';
import { WorkoutLog } from '../_models/workout-log.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WorkoutLogService extends DaoService<WorkoutLog> {
  constructor(http: HttpClient) {
    super(http, 'workoutlogs');
  }
}
