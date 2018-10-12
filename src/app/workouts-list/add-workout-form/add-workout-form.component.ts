import {
  Component,
  Output,
  OnInit,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { WorkoutService } from '../../_services/workout.service';
import { Workout } from '../../_models/workout.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../_services/alert.service';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-add-workout-form',
  templateUrl: './add-workout-form.component.html',
  styleUrls: ['./add-workout-form.component.scss'],
})
export class AddWorkoutFormComponent implements OnInit {
  @Output()
  onWorkoutCreated: EventEmitter<any> = new EventEmitter();
  @ViewChild('f')
  form: any;

  workout: Workout = new Workout();

  constructor(
    private workoutService: WorkoutService,
    private alertService: AlertService,
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (this.form.invalid) {
      this.alertService.error('Fill the form correctly!');
      return;
    }
    this.workoutService.create(this.workout).subscribe(
      data => {
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
    this.form.resetForm();

    return false;
  }
}
