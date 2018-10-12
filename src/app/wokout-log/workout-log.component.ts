import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Workout } from '../_models/workout.model';
import { AuthenticationService } from '../_services/authentication.service';
import { WorkoutLogService } from '../_services/workout-log.service';
import { WorkoutLog } from '../_models/workout-log.model';

@Component({
  selector: 'app-workout-log',
  templateUrl: './workout-log.component.html',
  styleUrls: ['./workout-log.component.scss'],
})
export class WorkoutLogComponent implements OnInit {
  loading: boolean;
  currentUserName: string;
  workoutLogs: WorkoutLog[];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private workoutLogService: WorkoutLogService,
  ) {}

  ngOnInit() {
    this.loading = true;
    this.currentUserName = this.authService.getCurrentUser().firstName;
    this.loading = false;
    this.loadWorkoutsList();
  }

  loadWorkoutsList() {
    this.workoutLogService.findAll().subscribe(logs => {
      this.workoutLogs = logs;
      this.loading = false;
    });
  }

  /**
   * To be passed to child form
   * @param log New Log to be shown in list
   */
  insertWorkoutLog(log: WorkoutLog) {
    this.workoutLogs.push(log);
  }
}
