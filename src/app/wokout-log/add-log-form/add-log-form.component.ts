import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Excercise } from '../../_models/excercise.model';
import { WorkoutService } from '../../_services/workout.service';
import { AlertService } from '../../_services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Workout } from 'src/app/_models/workout.model';

@Component({
  selector: 'app-add-log-form',
  templateUrl: './add-log-form.component.html',
  styleUrls: ['./add-log-form.component.scss'],
})
export class AddLogFormComponent implements OnInit {
  @Output()
  onExcerciseCreated: EventEmitter<any> = new EventEmitter();

  date: Date;
  workoutId: number;
  workouts: Workout[];

  constructor(
    private workoutService: WorkoutService,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    this.workoutService.findAll().subscribe(workouts => {
      this.workouts = workouts;
    });
  }

  resetForm() {
    this.date = this.workoutId = undefined;
  }

  onSubmit() {
    const workout: Workout = this.workouts.find(
      workout => workout._id == this.workoutId,
    );

    console.log(workout.name);
    console.log(this.date);

    // todo - save the Log object

    this.alertService.success('New log was created');
  }
}
