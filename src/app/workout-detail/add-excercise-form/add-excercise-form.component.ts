import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
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

  name: string;
  description: string;
  set: number;
  duration: number;

  constructor(
    private workoutService: WorkoutService,
    private alertService: AlertService,
  ) {}

  ngOnInit() {}

  resetForm() {
    this.name = this.description = this.set = this.duration = undefined;
  }

  onSubmit() {
    if (!this.workoutId) {
      return false;
    }

    let excercise: Excercise = new Excercise();
    excercise.name = this.name;
    excercise.description = this.description;
    excercise.set = this.set;
    excercise.duration = this.duration;

    this.workoutService.addNewExcerise(this.workoutId, excercise).subscribe(
      data => {
        this.resetForm();
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
