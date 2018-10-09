import { Injectable } from '@angular/core';
import { DaoService } from './dao.service';
import { Excercise } from '../_models/excercise.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExcerciseService extends DaoService<Excercise> {
  constructor(http: HttpClient) {
    super(http, 'workouts');
  }
}
