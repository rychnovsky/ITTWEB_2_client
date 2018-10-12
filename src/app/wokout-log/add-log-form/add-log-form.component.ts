import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { Excercise } from '../../_models/excercise.model';
import { WorkoutService } from '../../_services/workout.service';
import { AlertService } from '../../_services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Workout } from 'src/app/_models/workout.model';
import { WorkoutLog } from 'src/app/_models/workout-log.model';
import { WorkoutLogService } from 'src/app/_services/workout-log.service';

@Component({
  selector: 'app-add-log-form',
  templateUrl: './add-log-form.component.html',
  styleUrls: ['./add-log-form.component.scss'],
})
export class AddLogFormComponent implements OnInit {
  @Output()
  onWorkoutLogCreated: EventEmitter<any> = new EventEmitter();
  @ViewChild('f')
  form: any;

  workoutLog: WorkoutLog = new WorkoutLog(new Workout());

  workouts: Workout[];

  constructor(
    private workoutService: WorkoutService,
    private workoutLogService: WorkoutLogService,
    private alertService: AlertService,
  ) {
    console.log(this.workoutLog);
  }

  ngOnInit() {
    this.workoutService.findAll().subscribe(workouts => {
      this.workouts = workouts;
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.alertService.error('Fill the form correctly!');
      return;
    }

    this.workoutLogService.create(this.workoutLog).subscribe(
      data => {
        this.form.resetForm();
        this.onWorkoutLogCreated.emit(data);
        this.alertService.success('New log was created');
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
  }
}
