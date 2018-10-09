import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { WorkoutService } from '../../_services/workout.service';
import { Workout } from '../../_models/workout.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-add-workout-form',
  templateUrl: './add-workout-form.component.html',
  styleUrls: ['./add-workout-form.component.scss'],
})
export class AddWorkoutFormComponent implements OnInit {
  @Output()
  onWorkoutCreated: EventEmitter<any> = new EventEmitter();

  newWorkoutName: string;

  constructor(
    private workoutService: WorkoutService,
    private alertService: AlertService,
  ) {}

  ngOnInit() {}

  onSubmit() {
    let workout: Workout = new Workout();
    workout.name = this.newWorkoutName;

    this.workoutService.create(workout).subscribe(
      data => {
        this.newWorkoutName = '';
        this.onWorkoutCreated.emit(data);
        this.alertService.success('New workout created');
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        console.log(
          `Backend returned code ${err.status}, body was: ${err.error}`,
        );

        this.alertService.error(err.error.message);

        return false;
      },
    );
    return false;
  }
}
