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

@Component({
  selector: 'app-add-excercise-form',
  templateUrl: './add-excercise-form.component.html',
  styleUrls: ['./add-excercise-form.component.scss'],
})
export class AddExcerciseFormComponent implements OnInit {
  @Input()
  workoutId: number;
  @Output()
  onExcerciseCreated: EventEmitter<any> = new EventEmitter();
  @ViewChild('f')
  form: any;

  excercise: Excercise = new Excercise();

  constructor(
    private workoutService: WorkoutService,
    private alertService: AlertService,
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (!this.workoutId) {
      this.alertService.error('Error when submiting the form!');
      return false;
    }

    if (this.form.invalid) {
      this.alertService.error('Fill the form correctly!');
      return;
    }

    this.workoutService
      .addNewExcerise(this.workoutId, this.excercise)
      .subscribe(
        data => {
          this.form.resetForm();
          this.onExcerciseCreated.emit(data);
          this.alertService.success('New excercise created');
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
